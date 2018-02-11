import { DetailsComponent } from "./components/details/details.component";
import { PricesComponent } from "./components/prices/prices.component";
import { CountryService } from "./services/country.service.js";
import { Transition } from "@uirouter/angular";

/** States */
export const detailsState = {name: 'details', url: '/details', component: DetailsComponent};

export const pricesState = {name: 'prices', url: '/prices', component: PricesComponent};

// export const peopleState = {
//   name: 'people',
//   url: '/people',
//   component: People,
//   resolve: [
//     {
//       token: 'people',
//       deps: [PeopleService],
//       resolveFn: (peopleSvc) => peopleSvc.getAllPeople()
//     }
//   ]
// };
//
// export const personState = {
//   name: 'person',
//   url: '/people/:personId',
//   component: Person,
//   resolve: [
//     {
//       token: 'person',
//       deps: [Transition, PeopleService],
//       resolveFn: (trans, peopleSvc) => peopleSvc.getPerson(trans.params().personId)
//     }
//   ]
// };