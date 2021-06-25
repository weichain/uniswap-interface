export const useConnectHydraWallet = () => {
  return () => window.postMessage({ message: { type: 'CONNECT_HYDRAWALLET' } }, '*')
}
