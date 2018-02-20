import { Injectable } from '@angular/core';
import { EpObject } from '../model/objects/ep-object';
import { Price } from '../model/price';
import { Currency } from '../model/currency';
import { CurrencyService } from './currency.service';
import { CountryService } from './country.service';
import { Country } from '../model/country';
import { ObjectDetails } from '../model/objects/object-details';

@Injectable()
export class PricerService {
  constructor(private currencyService: CurrencyService, private countryService: CountryService) {}

  // FIXME get from db
  // FIXME ownership of this data?
  public worldPppGdp: number = 115165700000000;
  // FIXME get from db
  // FIXME ownership of this data?
  public worldTotalBiocapacity: number = 12233516313.9;

  computePrice(epObject: EpObject<ObjectDetails>): Price {
    // TODO store selected country and currency?
    const selectedCountry: Country = this.countryService.getSelectedCountry();
    const selectedCurrency: Currency = this.currencyService.getSelectedCurrency();
    const value =
      epObject.ef *
      this.worldPppGdp /
      this.worldTotalBiocapacity *
      selectedCountry.avgPrices *
      selectedCurrency.exchangeRate;
    return new Price(value, selectedCurrency);
  }
}
