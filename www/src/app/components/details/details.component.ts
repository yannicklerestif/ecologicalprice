import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';
import { CountryService } from '../../services/country.service';
import { Currency } from '../../model/currency';
import { Country } from '../../model/country';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  public selectedCountry: Country;

  public selectedCurrency: Currency;

  constructor(private countryService: CountryService, private currencyService: CurrencyService) {}

  ngOnInit() {
    this.selectedCountry = this.countryService.getCountry(
      this.countryService.getSelectedCountryCode().getValue()
    );
    this.selectedCurrency = this.currencyService.getCurrency(
      this.currencyService.getSelectedCurrencyCode().getValue()
    );
  }
}
