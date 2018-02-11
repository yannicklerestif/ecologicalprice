import { UIRouter } from '@uirouter/angular';
import { Injector } from '@angular/core';
import { Ng2StateDeclaration } from '@uirouter/angular';

import { DetailsComponent } from './components/details/details.component';
import { PricesComponent } from './components/prices/prices.component';
import { CountryService } from './services/country.service';
import { ViewportForwarderComponent } from './components/viewport-forwarder/viewport-forwarder.component';

/** UIRouter Config  */
export function uiRouterConfigFn(router: UIRouter, injector: Injector) {
  router.urlService.rules.otherwise({ state: 'root.prices' });
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
        resolveFn: (countryService: CountryService) => countryService.load(),
      },
    ],
    component: ViewportForwarderComponent,
  },
  {
    name: 'root.prices',
    url: '/prices',
    component: PricesComponent,
  },
  {
    name: 'root.details',
    url: '/details',
    component: DetailsComponent,
  },
];
