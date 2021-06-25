export class Currency {
  public readonly decimals: number
  public readonly symbol?: string
  public readonly name?: string

  public static readonly HYDRA: Currency = new Currency(8, 'HYDRA', 'Hydra')

  protected constructor(decimals: number, symbol?: string, name?: string) {
    this.decimals = decimals
    this.symbol = symbol
    this.name = name
  }
}

const HYDRA = Currency.HYDRA
export { HYDRA }
