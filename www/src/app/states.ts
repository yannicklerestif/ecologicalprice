import { UIRouter } from '@uirouter/angular';
import { Injector } from '@angular/core';
import {
  Ng2StateDeclaration,
  Transition,
  StateService,
  Rejection,
  RejectType,
} from '@uirouter/angular';

import { HeaderComponent } from './components/header/header.component';
import { DetailsComponent } from './components/details/details.component';
import { PricesComponent } from './components/prices/prices.component';
import { CountryService } from './services/country.service';
import { ViewportForwarderComponent } from './components/viewport-forwarder/viewport-forwarder.component';
import { CurrencyService } from './services/currency.service';

/** UIRouter Config  */
export function uiRouterConfigFn(router: UIRouter, injector: Injector) {
  let countryService: CountryService = injector.get(CountryService);
  router.urlService.rules.otherwise({ state: 'root.prices.summary' });
  router.stateService.defaultErrorHandler((r: Rejection) => {
    if (r.type === RejectType.SUPERSEDED) {
      console.log('ignoring: ', r);
    } else {
      console.error('Router error: ', r);
    }
  });
}

export function countriesResolveFn(countryService: CountryService) {
  return countryService.load();
}

export function currenciesResolveFn(currencyService: CurrencyService) {
  return currencyService.load();
}

export function countryResolveFn(
  countries,
  countryService: CountryService,
  transition: Transition,
  stateService: StateService
) {
  let countryCodeParam = transition.params().country;
  if (countryService.isValidCountryCode(countryCodeParam)) {
    countryService.setSelectedCountryCode(countryCodeParam);
    return;
  }
  let selectedCountryCode = countryService.getDefaultCountryCode();
  const stateName = transition.targetState().name();
  return stateService.go(stateName, { country: selectedCountryCode });
}

export function currencyResolveFn(
  countries,
  currencies,
  country,
  currencyService: CurrencyService,
  countryService: CountryService,
  transition: Transition,
  stateService: StateService
) {
  let currencyCodeParam = transition.params().currency;
  if (currencyCodeParam === currencyService.AUTO_CURRENCY_CODE) {
    const countryCurrency = countryService.getCountry(
      countryService.getSelectedCountryCode().getValue()
    ).defaultCurrencyCode;
    currencyService.setSelectedCurrencyCode(countryCurrency);
    return;
  }
  if (currencyService.isValidCurrencyCode(currencyCodeParam)) {
    currencyService.setSelectedCurrencyCode(currencyCodeParam);
    return;
  }
  let autoCurrencyCode = currencyService.AUTO_CURRENCY_CODE;
  const stateName = transition.targetState().name();
  return stateService.go(stateName, { currency: autoCurrencyCode });
}

export const states: Ng2StateDeclaration[] = [
  {
    name: 'root',
    url: '',
    abstract: true,
    resolve: [
      {
        token: 'countries',
        deps: [CountryService],
        resolveFn: countriesResolveFn,
      },
      {
        token: 'currencies',
        deps: [CurrencyService],
        resolveFn: currenciesResolveFn,
      },
    ],
    views: {
      header: { component: HeaderComponent },
      $default: { component: ViewportForwarderComponent },
    },
    component: ViewportForwarderComponent,
  },
  {
    name: 'root.prices',
    url: 'prices?country&currency',
    abstract: true,
    resolve: [
      {
        token: 'country',
        deps: ['countries', CountryService, Transition, StateService],
        resolveFn: countryResolveFn,
      },
      {
        token: 'currency',
        deps: [
          'countries',
          'currencies',
          'country',
          CurrencyService,
          CountryService,
          Transition,
          StateService,
        ],
        resolveFn: currencyResolveFn,
      },
    ],
    component: ViewportForwarderComponent,
  },
  {
    name: 'root.prices.summary',
    url: '/summary',
    component: PricesComponent,
  },
  {
    name: 'root.prices.details',
    url: '/details',
    component: DetailsComponent,
  },
];
