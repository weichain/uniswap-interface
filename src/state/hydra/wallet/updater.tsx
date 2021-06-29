import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../index'
import { connectWallet } from './actions'

export default function Updater(): null {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    window.addEventListener(
      'message',
      event => {
        const { target, message } = event.data

        if (target === 'hydrawallet-inpage') {
          const payload = message.payload
          if (payload) {
            if (payload.account) {
              dispatch(connectWallet({ account: payload.account }))
            }

            if (payload.statusChangeReason === 'Account Logged Out') {
              window.postMessage({ message: { type: 'CONNECT_HYDRAWALLET' } }, '*')
            }
          }
        }

        if (message) {
          switch (message.type) {
            case 'HYDRAWALLET_INSTALLED_OR_UPDATED': {
              window.location.reload()
              break
            }

            case 'HYDRAWALLET_ACCOUNT_CHANGED': {
              break
            }
          }
        }
      },
      false
    )
  }, [dispatch])

  return null
}
