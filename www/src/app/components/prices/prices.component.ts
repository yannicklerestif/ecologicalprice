import { Component, OnInit } from '@angular/core';
import { StateService } from '@uirouter/core';
import { CurrencyService } from '../../services/currency.service';
import { CountryService } from '../../services/country.service';
import { Currency } from '../../model/currency';
import { Country } from '../../model/country';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.scss'],
})
export class PricesComponent implements OnInit {
  public selectedCountry: Country;

  public selectedCurrency: Currency;

  constructor(
    private stateService: StateService,
    private countryService: CountryService,
    private currencyService: CurrencyService
  ) {}

  ngOnInit() {
    this.selectedCountry = this.countryService.getCountry(
      this.countryService.getSelectedCountryCode().getValue()
    );
    this.selectedCurrency = this.currencyService.getCurrency(
      this.currencyService.getSelectedCurrencyCode().getValue()
    );
  }
}
