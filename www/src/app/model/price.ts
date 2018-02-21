import { Currency } from './currency';

export class Price {
  constructor(public value: number, public currency: Currency) {}

  times(by: number): Price {
    return new Price(this.value * by, this.currency);
  }

  plus(price: Price): Price {
    return new Price(this.value + price.value, this.currency);
  }
}
