import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { Country } from '../model/country';

@Injectable()
export class CountryService {
  private userCountryCode: string;

  private countries: { [code: string]: Country } = {};

  private selectedCountryCode: Subject<string> = new ReplaySubject();

  public isLoaded = false;

  constructor() {}

  public load() {
    console.log('loading country service');

    // FIXME get that from the server
    this.countries = {
      AAA: new Country('AAA', 'test AAA', 'USD'),
      BBB: new Country('BBB', 'test BBB', 'EUR'),
    };

    // // FIXME replace with getting the country from the user's IP / geolocation
    this.userCountryCode = Object.keys(this.countries)[0];

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
