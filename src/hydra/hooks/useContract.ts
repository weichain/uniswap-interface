import { BALANCE_RESOLVER_ABI } from 'hydra/abi'
import { BALANCE_RESOLVER_CONTRACT_ADDRESS } from 'hydra/constants'
import { useMemo } from 'react'
import { useHydraProvider } from 'state/hydra/wallet/hooks'

export function useContract(address: string | undefined, ABI: any): any | null {
  const { provider } = useHydraProvider()

  return useMemo(() => {
    if (!address || !ABI || !provider) return null

    try {
      return provider.Contract(address, ABI)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [address, ABI, provider])
}

export function useBalanceResolverContract(address = BALANCE_RESOLVER_CONTRACT_ADDRESS) {
  return useContract(address, BALANCE_RESOLVER_ABI)
}
