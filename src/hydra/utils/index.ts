export function shortenAddress(address: string, chars = 4): string {
  return `${address.substring(0, chars + 2)}...${address.substring(34 - chars)}`
}

export function isAddress(value: any): string | false {
  return value
}
