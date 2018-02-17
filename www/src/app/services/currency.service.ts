import { Injectable } from '@angular/core';
import { Currency } from '../model/currency';
import { CurrencyRepositoryService } from './currency-repository.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CurrencyService {
  constructor(private currencyRepositoryService: CurrencyRepositoryService) {}

  public AUTO_CURRENCY_CODE: string = 'AUTO';

  private isLoaded = false;

  private currencies: { [code: string]: Currency } = {};

  private selectedCurrencyCode: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  async load(): Promise<void> {
    if (this.isLoaded === true) return;
    const currenciesArray = await this.currencyRepositoryService.fetchCurrencies();
    const currencies: { [code: string]: Currency } = {};
    currenciesArray.forEach(currency => (currencies[currency.code] = currency));
    this.currencies = currencies;
  }

  public getCurrencies(): Currency[] {
    return Object.values(this.currencies);
  }

  isValidCurrencyCode(currencyCode: string) {
    return currencyCode != null && this.currencies[currencyCode] != null;
  }

  getSelectedCurrencyCode(): BehaviorSubject<string> {
    return this.selectedCurrencyCode;
  }

  getCurrency(currencyCode: string): Currency {
    if (!this.isValidCurrencyCode(currencyCode)) {
      throw new Error(`Invalid currency code: ${currencyCode}`);
    }
    return this.currencies[currencyCode];
  }

  setSelectedCurrencyCode(currencyCode: string) {
    if (!this.isValidCurrencyCode(currencyCode))
      throw new Error(`Invalid currency code: ${currencyCode})`);
    this.selectedCurrencyCode.next(currencyCode);
  }
}
