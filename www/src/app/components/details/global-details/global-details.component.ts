import { Component, OnInit } from '@angular/core';
import { PricerService } from '../../../services/pricer.service';
import { Price } from '../../../model/price';
import { CurrencyService } from '../../../services/currency.service';
import { CountryService } from '../../../services/country.service';
import { Country } from '../../../model/country';
import { Currency } from '../../../model/currency';

@Component({
  selector: 'app-global-details',
  templateUrl: './global-details.component.html',
  styleUrls: [],
})
export class GlobalDetailsComponent implements OnInit {
  selectedCountry: Country;
  selectedCurrency: Currency;
  worldTotalBiocapacity: number;
  worldPppGdp: number;
  globalHectarePriceIntDollars: number;
  globalSquareMeterPriceIntDollars: number;
  globalSquareMeterPrice: Price;

  constructor(
    private countryService: CountryService,
    private currencyService: CurrencyService,
    private pricerService: PricerService
  ) {}

  ngOnInit() {
    this.selectedCountry = this.countryService.getSelectedCountry();
    this.selectedCurrency = this.currencyService.getSelectedCurrency();
    this.worldTotalBiocapacity = this.pricerService.worldTotalBiocapacity / 1000000000;
    this.worldPppGdp = this.pricerService.worldPppGdp / 1000000000;
    this.globalHectarePriceIntDollars = this.worldPppGdp / this.worldTotalBiocapacity;
    this.globalSquareMeterPriceIntDollars = this.globalHectarePriceIntDollars / 10000;
    this.globalSquareMeterPrice = this.pricerService.getGlobalSquareMeterPrice();
  }
}
