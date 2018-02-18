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
import { HomeComponent } from './components/home/home.component';
import { DetailsComponent } from './components/details/details.component';
import { PricesComponent } from './components/prices/prices.component';
import { CountryService } from './services/country.service';
import { ViewportForwarderComponent } from './components/viewport-forwarder/viewport-forwarder.component';
import { CurrencyService } from './services/currency.service';
import { ObjectService } from './services/object/object.service';

export function uiRouterConfigFn(router: UIRouter, injector: Injector) {
  let countryService: CountryService = injector.get(CountryService);
  router.urlService.rules.otherwise({ state: 'root.prices.home' });
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

export function objectsResolveFn(objectService: ObjectService) {
  return objectService.load();
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
  // for some reason the country is not remembered, we have to pass it explicitely
  const params = Object.assign({}, transition.params());
  params.currency = autoCurrencyCode;
  return stateService.go(stateName, params);
}

// FIXME use 'default' (or undefined) for the country parameter if the country is the user's country.
// otherwise, if I live in France and send the URL for EP to a user that lives in the US, he will see
// the prices for France, which is not what we want unless we explicitly forced France as the country
export const states: Ng2StateDeclaration[] = [
  {
    name: 'root',
    url: '',
    abstract: true,
    // FIXME bundle all this resolves
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
      {
        token: 'objects',
        deps: [ObjectService],
        resolveFn: objectsResolveFn,
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
    name: 'root.prices.home',
    url: '/home',
    component: HomeComponent,
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
