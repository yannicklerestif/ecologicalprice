import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { Country } from '../model/country';
import { CountryRepositoryService } from './country-repository.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CountryService {
  private userCountryCode: string;

  private countries: { [code: string]: Country } = {};

  // TODO since nobody is supposed to subscribe before the subject has an actual value,
  // TODO would maybe be nicer to create it when we actually have a value
  private selectedCountryCode: BehaviorSubject<string> = new BehaviorSubject(null);

  public isLoaded = false;

  constructor(private countryRepositoryService: CountryRepositoryService) {}

  public async load(): Promise<void> {
    if (this.isLoaded === true) return;
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

  // TODO actually I think this is only used to get the selected country,
  // TODO so getSelectedCountry() would probably be more useful
  public getCountry(countryCode: string) {
    if (!this.isValidCountryCode(countryCode))
      throw new Error(`invalid country code: ${countryCode}`);
    return this.countries[countryCode];
  }

  public getSelectedCountry(): Country {
    return this.countries[this.selectedCountryCode.getValue()];
  }

  public getCountries(): Country[] {
    return Object.values(this.countries);
  }

  public getSelectedCountryCode(): BehaviorSubject<string> {
    return this.selectedCountryCode;
  }

  public isValidCountryCode(selectedCountryCode: string): boolean {
    return selectedCountryCode != null && this.countries[selectedCountryCode] != null;
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
