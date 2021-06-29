import { createReducer } from '@reduxjs/toolkit'
import { updateBalances } from './actions'

export const initialState: any = {
  loading: true
}

export default createReducer(initialState, builder =>
  builder.addCase(updateBalances, (state, { payload: { balances } }) => {
    state = balances
    return state
  })
)
