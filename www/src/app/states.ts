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
  router.urlService.rules.otherwise({ state: 'root.prices' });
  router.transitionService.onFinish({}, (transition: Transition) => {
    let countryCodeParam = transition.params().country;
    if (countryService.isValidCountryCode(countryCodeParam)) {
      countryService.setSelectedCountryCode(countryCodeParam);
      console.log(`-- country code is valid: ${countryCodeParam}`);
      return true;
    }
    let selectedCountryCode = countryService.getDefaultCountryCode();
    const redirectState = transition
      .targetState()
      .withParams({ country: selectedCountryCode })
      .withOptions({ location: false });

    console.log(
      `invalid country code: ${countryCodeParam} => will replace with ${selectedCountryCode}`
    );
    router.stateService.go(
      redirectState.name(),
      redirectState.params(),
      redirectState.options()
    );
  });
}

export const states: Ng2StateDeclaration[] = [
  {
    name: 'root',
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
    url: '/prices/?country',
    params: {
      country: {
        dynamic: true,
      },
    },
    component: PricesComponent,
  },
  {
    name: 'root.details',
    url: '/details/?country',
    component: DetailsComponent,
  },
];
