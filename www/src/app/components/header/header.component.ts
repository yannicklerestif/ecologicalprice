import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TransitionService } from '@uirouter/angular';
import { MatSelectChange } from '@angular/material/select/typings';

import { CountryService } from '../../services/country.service';
import { Country } from '../../model/country';
import { StateService, Transition } from '@uirouter/core';
import { CurrencyService } from '../../services/currency.service';
import { Currency } from '../../model/currency';
import { CurrencyOption } from './currency-option';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(
    private countryService: CountryService,
    private currencyService: CurrencyService,
    private stateService: StateService,
    private transitionService: TransitionService,
    private transition: Transition
  ) {}

  public countries: Country[];

  public currencies: CurrencyOption[];

  public selectedCountryCode: string;

  public selectedCurrencyCodeOrAuto: string;

  private selectedCountrySubscription: Subscription;

  private unregisterTransitionHook;

  ngOnInit() {
    this.countries = this.countryService
      .getCountries()
      .sort((a: Country, b: Country) => a.name.localeCompare(b.name));

    const createCurrencyOption = (currency: Currency, isAuto: boolean) => {
      let name: string = `${currency.code} (${currency.symbol})`;
      if (isAuto) name = 'Auto: ' + name;
      const code = isAuto ? this.currencyService.AUTO_CURRENCY_CODE : currency.code;
      return new CurrencyOption(code, name);
    };

    const currencies = this.currencyService
      .getCurrencies()
      .map((currency: Currency) => createCurrencyOption(currency, false))
      .sort((a: CurrencyOption, b: CurrencyOption) => a.name.localeCompare(b.name));

    const autoCurrency = new Currency(this.currencyService.AUTO_CURRENCY_CODE, 'iii', '', 0);

    this.currencies = [autoCurrency, ...currencies];

    this.selectedCountrySubscription = this.countryService
      .getSelectedCountryCode()
      .subscribe(selectedCountryCode => {
        this.selectedCountryCode = selectedCountryCode;
        // country changed, so we must change the label for the 'auto' currency
        const selectedCountry: Country = this.countryService.getCountry(
          this.countryService.getSelectedCountryCode().getValue()
        );
        const selectedCountryCurrency: Currency = this.currencyService.getCurrency(
          selectedCountry.defaultCurrencyCode
        );
        // modifying in place so that the graphical element is updated automatically
        Object.assign(autoCurrency, createCurrencyOption(selectedCountryCurrency, true));
      });

    const getSelectedCurrencyCodeFromTransition = (transition: Transition) => {
      let currencyCodeOrAuto = transition.targetState().params()['currency'];
      this.selectedCurrencyCodeOrAuto = currencyCodeOrAuto;
    };

    getSelectedCurrencyCodeFromTransition(this.transition);

    this.unregisterTransitionHook = this.transitionService.onFinish(
      {},
      (transition: Transition) => {
        getSelectedCurrencyCodeFromTransition(transition);
      }
    );
  }

  ngOnDestroy() {
    this.selectedCountrySubscription.unsubscribe();
    this.unregisterTransitionHook();
  }

  public countryChanged($event: MatSelectChange) {
    let countryCode: string = $event.value;
    this.stateService.go(
      this.stateService.$current.name,
      // TODO for some reason we have to pass the currency, even though it should be
      // TODO inherited from the current state
      { country: countryCode, currency: this.selectedCurrencyCodeOrAuto }
    );
  }

  public currencyChanged($event: MatSelectChange) {
    let currencyCode: string = $event.value;
    this.stateService.go(this.stateService.$current.name, { currency: currencyCode });
  }
}
