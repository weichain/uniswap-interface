import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../index'
import { useBalanceResolverContract } from 'hydra/hooks/useContract'
import { useAllTokens } from 'hooks/Tokens'
import { Token } from 'hydra/sdk'
import { useHydraState } from '../wallet/hooks'
import { JSBI, TokenAmount } from '@uniswap/sdk'
import { updateBalances } from './actions'

const PERIOD = 15000

export default function Updater(): null {
  const dispatch = useDispatch<AppDispatch>()

  const balanceResolverContract = useBalanceResolverContract()
  const tokenList = useAllTokens()
  const { address } = useHydraState()

  const allTokens = Object.values(tokenList).map((token: Token) => {
    return token
  })

  const allTokenAddresses = Object.values(tokenList).map((token: Token) => {
    return token.address
  })

  useEffect(() => {
    let stale = false

    async function get() {
      if (!stale) {
        if (balanceResolverContract) {
          try {
            const methodArgs = [address, allTokenAddresses]

            const response = await balanceResolverContract.call('getBalances', {
              methodArgs,
              address
            })

            if (response?.executionResult?.formattedOutput[0]) {
              const balances = response?.executionResult?.formattedOutput[0]
              const result = allTokens.reduce<{ [tokenAddress: string]: TokenAmount | undefined }>(
                (result, token, i) => {
                  const value = balances?.[i]
                  const amount = value ? JSBI.BigInt(value.toString()) : undefined
                  if (amount) {
                    result[token.address] = new TokenAmount(token, amount)
                  }
                  return result
                },
                {}
              )
              dispatch(updateBalances({ balances: result }))
            }
          } catch (error) {
            console.log(error)
          }
        }
      }
    }

    get()

    const balacnePoll = setInterval(() => {
      get()
    }, PERIOD)

    return () => {
      stale = true
      clearInterval(balacnePoll)
    }
  }, [dispatch, balanceResolverContract, address, allTokenAddresses, allTokens])

  return null
}
