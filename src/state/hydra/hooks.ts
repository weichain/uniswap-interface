import { useSelector } from 'react-redux'
import { AppState } from '../index'

export function useHydraState(): AppState['hydra'] {
  return useSelector<AppState, AppState['hydra']>(state => state.hydra)
}
