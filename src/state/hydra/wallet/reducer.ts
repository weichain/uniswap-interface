import { createReducer } from '@reduxjs/toolkit'
import { connectWallet } from './actions'

declare global {
  interface Window {
    hydrawallet: any
  }
}

interface AccountState {
  address: string
  balance: string
  loggedIn: boolean
  name: string
  network: string
}

export const initialState: AccountState = {
  address: '',
  balance: '',
  loggedIn: false,
  name: '',
  network: ''
}

export default createReducer(initialState, builder =>
  builder.addCase(connectWallet, (_account, { payload: { account } }) => {
    _account = account
    return _account
  })
)
