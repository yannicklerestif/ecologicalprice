import { UIRouter } from '@uirouter/angular';
import { Injector } from '@angular/core';
import {
  Ng2StateDeclaration,
  Transition,
  StateService,
} from '@uirouter/angular';

import { HeaderComponent } from './components/header/header.component';
import { DetailsComponent } from './components/details/details.component';
import { PricesComponent } from './components/prices/prices.component';
import { CountryService } from './services/country.service';
import { ViewportForwarderComponent } from './components/viewport-forwarder/viewport-forwarder.component';

/** UIRouter Config  */
export function uiRouterConfigFn(router: UIRouter, injector: Injector) {
  let countryService: CountryService = injector.get(CountryService);
  router.urlService.rules.otherwise({ state: 'root.prices.summary' });
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
        resolveFn: (countryService: CountryService) => {
          countryService.load();
        },
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
    url: 'prices?country',
    abstract: true,
    resolve: [
      {
        token: 'country',
        deps: ['countries', CountryService, Transition, StateService],
        resolveFn: (
          countries,
          countryService: CountryService,
          transition: Transition,
          stateService: StateService
        ) => {
          let countryCodeParam = transition.params().country;
          if (countryService.isValidCountryCode(countryCodeParam)) {
            countryService.setSelectedCountryCode(countryCodeParam);
            return;
          }
          let selectedCountryCode = countryService.getDefaultCountryCode();
          const redirectState = transition
            .targetState()
            .withParams({ country: selectedCountryCode })
            .withOptions({ location: true });
          stateService.go(
            redirectState.name(),
            redirectState.params(),
            redirectState.options()
          );
        },
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
