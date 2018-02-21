// core / angular
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UIRouterModule } from '@uirouter/angular';
import { CurrencyPipe } from '@angular/common';

// angular material
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

// app
import { CountryService } from './services/country.service';
import { AppComponent } from './app.component';
import { PricesComponent } from './components/prices/prices.component';
import { DetailsComponent } from './components/details/details.component';
import { ViewportForwarderComponent } from './components/viewport-forwarder/viewport-forwarder.component';
import { states, uiRouterConfigFn } from './states';
import { HeaderComponent } from './components/header/header.component';
import { APIInterceptor } from './services/api-interceptor.service';
import { CountryRepositoryService } from './services/country-repository.service';
import { CurrencyService } from './services/currency.service';
import { CurrencyRepositoryService } from './services/currency-repository.service';
import { HomeComponent } from './components/home/home.component';
import { PricesTableComponent } from './components/prices-table/prices-table.component';
import { ObjectService } from './services/object/object.service';
import { ObjectRepositoryService } from './services/object/object-repository.service';
import { PricerService } from './services/pricer.service';
import { ScrollHelperService } from './services/scroll-helper.service';
import { Co2DetailsComponent } from './components/details/co2/co2-details.component';
import { EcologicalPricePipe } from './pipes/ecological-price.pipe';
import { GlobalDetailsComponent } from './components/details/global-details/global-details.component';
import { CropDetailsComponent } from './components/details/crop-details/crop-details.component';
import { LivestockDetailsComponent } from './components/details/livestock-details/livestock-details.component';
import { CompoundDetailsComponent } from './components/details/compound-details/compound-details.component';

@NgModule({
  declarations: [
    AppComponent,
    PricesComponent,
    DetailsComponent,
    ViewportForwarderComponent,
    HeaderComponent,
    HomeComponent,
    PricesTableComponent,
    Co2DetailsComponent,
    EcologicalPricePipe,
    GlobalDetailsComponent,
    CropDetailsComponent,
    LivestockDetailsComponent,
    CompoundDetailsComponent,
  ],
  imports: [
    // core / angular
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    UIRouterModule.forRoot({
      states: states,
      useHash: true,
      config: uiRouterConfigFn,
    }),
    // material
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatSelectModule,
    MatTabsModule,
    MatIconModule,
    MatTableModule,
  ],
  providers: [
    CurrencyPipe,
    CountryService,
    CountryRepositoryService,
    CurrencyService,
    CurrencyRepositoryService,
    ObjectService,
    ObjectRepositoryService,
    PricerService,
    ScrollHelperService,
    EcologicalPricePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
