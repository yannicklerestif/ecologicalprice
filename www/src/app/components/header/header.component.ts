import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TransitionService } from '@uirouter/angular';
import { MatSelectChange } from '@angular/material/select/typings';

import { CountryService } from '../../services/country.service';
import { Country } from '../../model/country';
import { StateService } from '@uirouter/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(
    private countryService: CountryService,
    private stateService: StateService
  ) {}

  public countries: Country[];

  private selectedCountryCode: string;

  private selectedCountrySubscription: Subscription;

  ngOnInit() {
    this.countries = this.countryService.getCountries();

    this.selectedCountrySubscription = this.countryService
      .getSelectedCountryCode()
      .subscribe(selectedCountryCode => {
        this.selectedCountryCode = selectedCountryCode;
        console.log('new country: ', selectedCountryCode);
      });
  }

  ngOnDestroy() {
    this.selectedCountrySubscription.unsubscribe();
  }

  public countryChanged($event: MatSelectChange) {
    let countryCode: string = $event.value;
    this.stateService.go(
      this.stateService.$current.name,
      { country: countryCode },
      { location: true }
    );
  }
}
