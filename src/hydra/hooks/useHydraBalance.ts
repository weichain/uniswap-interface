import { useMemo } from 'react'
import { CurrencyAmount } from 'hydra/sdk'
import { useHydraState } from 'state/hydra/hooks'

export function useHydraBalance(): CurrencyAmount | undefined {
  const { balance } = useHydraState()

  return useMemo(() => {
    return CurrencyAmount.hydra(balance)
  }, [balance])
}
