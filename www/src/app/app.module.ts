import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { UIRouterModule } from '@uirouter/angular';

import { MatToolbarModule } from '@angular/material/toolbar';

import { CountryService } from "./services/country.service";
import { AppComponent } from './app.component';
import { PricesComponent } from './components/prices/prices.component';
import { DetailsComponent } from './components/details/details.component';

import { detailsState, pricesState} from './states';

@NgModule({
  declarations: [
    AppComponent,
    PricesComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    UIRouterModule.forRoot({
      states: [ detailsState, pricesState ], // FIXME set up
      useHash: true,
    }),
    MatToolbarModule
  ],
  providers: [
    CountryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
