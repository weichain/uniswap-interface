import { useEffect, useState } from 'react'
import { useHydraProvider } from 'state/hydra/wallet/hooks'

export function useContractCall(
  contractAddress: string,
  abi: any,
  method: string,
  methodArgs: any[],
  userAddress?: string
) {
  const [data, dataSet] = useState<any>(null)
  const [isLoading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)

  const { provider } = useHydraProvider()

  useEffect(() => {
    async function callContract() {
      if (userAddress && provider?.Contract) {
        const contract = provider.Contract(contractAddress, abi)
        const response = await contract.call(method, {
          methodArgs,
          userAddress
        })

        if (!response?.executionResult?.formattedOutput) {
          setError(true)
        } else {
          dataSet(response.executionResult.formattedOutput[0])
          setLoading(false)
        }
      }
    }

    callContract()
  }, [provider, method, methodArgs, userAddress, abi, contractAddress])

  return [data, isLoading, error]
}
