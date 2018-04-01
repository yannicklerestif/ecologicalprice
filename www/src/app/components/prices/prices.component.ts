import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';
import { CountryService } from '../../services/country.service';
import { PricedObject } from '../prices-table/priced-object';
import { ObjectService } from '../../services/object/object.service';
import { EpObject } from '../../model/objects/ep-object';
import { PricerService } from '../../services/pricer.service';
import { Price } from '../../model/price';
import { ObjectType } from '../../model/objects/object-type';
import { ObjectDetails } from '../../model/objects/object-details';
import { ScrollHelperService } from '../../services/scroll-helper.service';
import { Constants } from '../../constants';
import { Transition } from '@uirouter/core';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.scss'],
})
export class PricesComponent implements OnInit {
  public selectedCountryName: string;

  public selectedCurrencyName: string;

  private pricedObjects: { [objectType: number]: PricedObject[] };

  constructor(
    private transition: Transition,
    private scrollHelperService: ScrollHelperService,
    private countryService: CountryService,
    private currencyService: CurrencyService,
    private objectService: ObjectService,
    private pricerService: PricerService
  ) {}

  ngOnInit() {
    document.title = Constants.applicationTitlePrefix + 'Prices Summary';
    this.scrollHelperService.scrolltopIfNecessary(this.transition);
    const selectedCountry = this.countryService.getCountry(
      this.countryService.getSelectedCountryCode().getValue()
    );
    this.selectedCountryName = selectedCountry.name;
    const selectedCurrency = this.currencyService.getCurrency(
      this.currencyService.getSelectedCurrencyCode().getValue()
    );
    this.selectedCurrencyName = `${selectedCurrency.name} (${selectedCurrency.code})`;

    const objects: EpObject<ObjectDetails>[] = this.objectService.getObjects();

    const pricedObjects = {};
    objects.forEach(epObject => {
      let pricedObjectOfType: PricedObject[] = pricedObjects[epObject.objectType];
      if (pricedObjectOfType == null) {
        pricedObjectOfType = [];
        pricedObjects[epObject.objectType] = pricedObjectOfType;
      }
      const objectPrice: Price = this.pricerService.computePrice(epObject);
      pricedObjectOfType.push(new PricedObject(epObject, objectPrice));
    });
    this.pricedObjects = pricedObjects;
  }

  public getCo2Objects(): PricedObject[] {
    return this.pricedObjects[ObjectType.Co2];
  }

  public getCropObjects(): PricedObject[] {
    return this.pricedObjects[ObjectType.Crop];
  }

  public getLivestockObjects(): PricedObject[] {
    return this.pricedObjects[ObjectType.Livestock];
  }

  public getCompoundObjects(): PricedObject[] {
    return this.pricedObjects[ObjectType.Compound];
  }
}
