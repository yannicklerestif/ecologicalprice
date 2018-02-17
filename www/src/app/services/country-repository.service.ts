import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../model/country';

@Injectable()
export class CountryRepositoryService {
  constructor(private httpClient: HttpClient) {}

  public async fetchCountries(): Promise<Country[]> {
    const response = await this.httpClient.get('api/download_countries.php').toPromise();
    return (response as any[]).map(
      rawCountry =>
        new Country(
          rawCountry['code'],
          rawCountry['name'],
          rawCountry['currency_code'],
          rawCountry['country_avg_prices']
        )
    );
  }

  public async fetchUserCountry(): Promise<string> {
    const userCountry = await this.httpClient.get('api/get_user_country.php').toPromise();
    return userCountry as string;
  }
}
