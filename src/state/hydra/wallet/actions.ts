import { createAction } from '@reduxjs/toolkit'

interface InputAccountState {
  address: string
  balance: string
  loggedIn: boolean
  name: string
  network: string
}

export const connectWallet = createAction<{ account: InputAccountState }>('hydra/connect')
