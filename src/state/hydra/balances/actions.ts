import { createAction } from '@reduxjs/toolkit'

export const updateBalances = createAction<{ balances: any }>('hydra/balance')
