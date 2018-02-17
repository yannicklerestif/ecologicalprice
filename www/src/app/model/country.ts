export class Country {
  constructor(
    public code: string,
    public name: string,
    public defaultCurrencyCode: string,
    public avgPrices: number
  ) {}
}
