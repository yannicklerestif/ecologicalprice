import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { Country } from '../model/country';
import { CountryRepositoryService } from './country-repository.service';

@Injectable()
export class CountryService {
  private userCountryCode: string;

  private countries: { [code: string]: Country } = {};

  private selectedCountryCode: Subject<string> = new ReplaySubject();

  public isLoaded = false;

  constructor(private countryRepositoryService: CountryRepositoryService) {}

  public async load(): Promise<void> {
    const countriesArray = await this.countryRepositoryService.fetchCountries();
    const countries: { [code: string]: Country } = {};
    countriesArray.forEach(country => (countries[country.code] = country));
    this.countries = countries;

    let userCountryCode;
    try {
      userCountryCode = await this.countryRepositoryService.fetchUserCountry();
    } catch (e) {
      console.error('error fetching user country', e);
    }
    if (!this.isValidCountryCode(userCountryCode)) userCountryCode = 'US';
    this.userCountryCode = userCountryCode;

    this.isLoaded = true;
  }

  public getCountries(): Country[] {
    return Object.values(this.countries);
  }

  public getSelectedCountryCode(): Subject<string> {
    return this.selectedCountryCode;
  }

  public isValidCountryCode(selectedCountryCode: string): boolean {
    return (
      selectedCountryCode != null && this.countries[selectedCountryCode] != null
    );
  }

  public getDefaultCountryCode(): string {
    return this.userCountryCode;
  }

  public setSelectedCountryCode(selectedCountryCode: string) {
    if (!this.isValidCountryCode(selectedCountryCode))
      throw new Error(`invalid country code: ${selectedCountryCode}`);
    this.selectedCountryCode.next(selectedCountryCode);
  }
}
