import { useEffect, useState } from 'react'
import { useHydraProvider } from 'state/hydra/hooks'

export function useContractCall(
  contractAddress: string,
  abi: any,
  method: string,
  methodArgs: any,
  userAddress: string
) {
  const [data, dataSet] = useState<any>(null)
  const [isLoading, setLoading] = useState<boolean>(true)

  const { provider } = useHydraProvider()
  const contract = provider.Contract(contractAddress, abi)

  useEffect(() => {
    async function callContract() {
      const response = await contract.call(method, {
        methodArgs,
        userAddress
      })
      dataSet(response)
      setLoading(false)
    }

    callContract()
  }, [contract, method, methodArgs, userAddress])

  return [data, isLoading]
}
