import { Injectable } from '@angular/core';
import { Country } from "../model/country";

@Injectable()
export class CountryService {

  private countries: { [code: string]:Country; } = {};

  constructor() { }

  public load() {
    console.log('loading countries');

    this.countries = {
      'AAA': new Country('AAA', 'test AAA', 'USD'),
      'BBB': new Country('BBB', 'test BBB', 'EUR'),
    };
  }
}
