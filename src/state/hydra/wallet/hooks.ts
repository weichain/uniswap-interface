import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../../index'
import { Hydraweb3 } from 'hydraweb3-js'

export function useHydraState(): AppState['hydra'] {
  return useSelector<AppState, AppState['hydra']>(state => state.hydra)
}

export function useHydraProvider(): { provider: any } {
  const { address } = useHydraState()
  const [provider, setProvider] = useState(null)

  useEffect(() => {
    if (address) {
      if (window.hydrawallet) {
        setProvider(new Hydraweb3(window.hydrawallet.rpcProvider))
      }
    }
  }, [address])

  return { provider }
}
