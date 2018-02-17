import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Currency } from '../model/currency';

@Injectable()
export class CurrencyRepositoryService {
  constructor(private httpClient: HttpClient) {}

  public async fetchCurrencies(): Promise<Currency[]> {
    const response = await this.httpClient.get('api/download_currencies.php').toPromise();
    return (response as any[]).map(
      rawCurrency =>
        new Currency(
          rawCurrency['code'],
          rawCurrency['name'],
          rawCurrency['symbol'],
          rawCurrency['units_per_USD']
        )
    );
  }
}
