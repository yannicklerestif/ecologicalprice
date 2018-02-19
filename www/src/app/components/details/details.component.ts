import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';
import { CountryService } from '../../services/country.service';
import { Currency } from '../../model/currency';
import { Country } from '../../model/country';
import { PricerService } from '../../services/pricer.service';
import { Co2Object } from '../../model/co2-object';
import { Co2ObjectService } from '../../services/object/co2-object.service';
import { ObjectService } from '../../services/object/object.service';
import { EpObject } from '../../model/ep-object';
import { Price } from '../../model/price';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  public selectedCountry: Country;
  public selectedCurrency: Currency;

  public worldTotalBiocapacity: number;
  public worldPppGdp: number;
  public globalHectarePriceIntDollars: number;
  globalHectarePriceSelectedCurrency: number;
  co2Footprint: number;
  sampleCo2Object: Co2Object;
  sampleCo2ObjectEpObject: EpObject;
  sampleCo2ObjectEcologicalFootprint: number;
  sampleCo2ObjectEcologicalPrice: Price;

  constructor(
    private countryService: CountryService,
    private currencyService: CurrencyService,
    private pricerService: PricerService,
    private objectService: ObjectService,
    private co2ObjectService: Co2ObjectService
  ) {}

  ngOnInit() {
    this.selectedCountry = this.countryService.getCountry(
      this.countryService.getSelectedCountryCode().getValue()
    );
    this.selectedCurrency = this.currencyService.getCurrency(
      this.currencyService.getSelectedCurrencyCode().getValue()
    );
    // global data
    this.worldTotalBiocapacity = this.pricerService.worldTotalBiocapacity / 1000000000;
    this.worldPppGdp = this.pricerService.worldPppGdp / 1000000000;
    this.globalHectarePriceIntDollars = this.worldPppGdp / this.worldTotalBiocapacity;
    this.globalHectarePriceSelectedCurrency =
      this.globalHectarePriceIntDollars *
      this.selectedCountry.avgPrices *
      this.selectedCurrency.exchangeRate;
    // FIXME get from db
    // co2 objects
    this.co2Footprint = 0.000256;
    this.sampleCo2Object = this.co2ObjectService.getSampleCo2Object();
    this.sampleCo2ObjectEpObject = this.objectService.getObject(this.sampleCo2Object.objectId);
    this.sampleCo2ObjectEcologicalFootprint = this.sampleCo2Object.co2Cost * this.co2Footprint;
    this.sampleCo2ObjectEcologicalPrice = this.pricerService.computePrice(
      this.sampleCo2ObjectEpObject
    );
  }
}
