import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Price } from '../model/price';

@Pipe({
  name: 'ecologicalPrice',
})
export class EcologicalPricePipe implements PipeTransform {
  constructor(private currencyPipe: CurrencyPipe) {}

  transform(price: Price, digits?: string): any {
    //value: any, currencyCode?: string, display?: 'code' | 'symbol' | 'symbol-narrow' | boolean, digits?: string, locale?: string
    if (!digits) return this.currencyPipe.transform(price.value, price.currency.code);
    else return this.currencyPipe.transform(price.value, price.currency.code, 'symbol', digits);
  }
}
