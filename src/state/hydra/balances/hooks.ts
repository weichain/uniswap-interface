import { useHydraBalance } from 'hydra/hooks'
import { HYDRA, Token } from 'hydra/sdk'
import { useSelector } from 'react-redux'
import { AppState } from '../../index'

export function useHydraBalances(): AppState['hydrabalances'] {
  return useSelector<AppState, AppState['hydrabalances']>(state => state.hydrabalances)
}

export function useTokenBalances(token: Token | undefined) {
  const hydraBalance = useHydraBalance()
  const allBalances = useHydraBalances()

  if (token) {
    if (token === HYDRA) {
      return hydraBalance
    }
    return allBalances[token.address]
  }

  return allBalances
}
