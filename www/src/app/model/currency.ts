export class Currency {
  constructor(
    public code: string,
    public name: string,
    public symbol: string,
    // in units per USD
    public exchangeRate: number
  ) {}
}
