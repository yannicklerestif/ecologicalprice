import { DetailsComponent } from "./components/details/details.component";
import { PricesComponent } from "./components/prices/prices.component";
import { CountryService } from "./services/country.service";
import { Ng2StateDeclaration } from "@uirouter/angular";

export const states: Ng2StateDeclaration[] = [
  {
    name: 'root',
    url: '',
    abstract: true,
    resolve: [
      {
        token: 'countries',
        deps: [CountryService],
        resolveFn: (countryService: CountryService) => countryService.load()
      }
    ]
  }, {
    name: 'root.details',
    url: '/details',
    component: DetailsComponent
  },
  {
    name: 'prices',
    url: '/prices',
    component: PricesComponent
  }
];