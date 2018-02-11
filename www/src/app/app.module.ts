import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { UIRouterModule } from '@uirouter/angular';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';

import { CountryService } from "./services/country.service";
import { AppComponent } from './app.component';
import { PricesComponent } from './components/prices/prices.component';
import { DetailsComponent } from './components/details/details.component';
import { ViewportForwarderComponent } from './components/viewport-forwarder/viewport-forwarder.component';

import { states, uiRouterConfigFn } from './states';

@NgModule({
  declarations: [
    AppComponent,
    PricesComponent,
    DetailsComponent,
    ViewportForwarderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    UIRouterModule.forRoot({
      states: states,
      useHash: true,
      config: uiRouterConfigFn,
    }),
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatTabsModule,
  ],
  providers: [
    CountryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
