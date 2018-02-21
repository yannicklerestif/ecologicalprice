import { Component, OnInit } from '@angular/core';
import { Transition } from '@uirouter/core';

import { CurrencyService } from '../../services/currency.service';
import { CountryService } from '../../services/country.service';
import { Currency } from '../../model/currency';
import { Country } from '../../model/country';
import { PricerService } from '../../services/pricer.service';
import { Co2Object } from '../../model/objects/co2-object';
import { ObjectService } from '../../services/object/object.service';
import { EpObject } from '../../model/objects/ep-object';
import { Price } from '../../model/price';
import { CropObject } from '../../model/objects/crop-object';
import { LivestockObject } from '../../model/objects/livestock-object';
import { CompoundObject } from '../../model/objects/compound-object';
import { ScrollHelperService } from '../../services/scroll-helper.service';
import { CompoundObjectLink } from '../../model/objects/compound-object-link';
import { ObjectDetails } from '../../model/objects/object-details';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  public selectedCountry: Country;
  public selectedCurrency: Currency;

  public worldTotalBiocapacity: number;
  public worldPppGdp: number;
  public globalHectarePriceIntDollars: number;
  globalSquareMeterPriceIntDollars: number;
  globalSquareMeterPriceSelectedCurrency: number;
  co2Footprint: number;
  sampleCo2Object: EpObject<Co2Object>;
  sampleCo2ObjectEcologicalFootprint: number;
  sampleCo2ObjectEcologicalPrice: Price;
  sampleCropObject: EpObject<CropObject>;
  equivalenceFactorForCropLand: number;
  sampleCropObjectSurfaceNeeded: number;
  sampleCropObjectEcologicalPrice: Price;
  sampleLivestockObject: EpObject<LivestockObject>;
  sampleLivestockObjectEcologicalFootprint1Kg: number;
  sampleLivestockObjectEcologicalPrice: Price;
  sampleCompoundObject: EpObject<CompoundObject>;

  constructor(
    private transition: Transition,
    private countryService: CountryService,
    private currencyService: CurrencyService,
    private pricerService: PricerService,
    private objectService: ObjectService,
    private scrollHelperService: ScrollHelperService
  ) {}

  ngOnInit() {
    this.scrollHelperService.scrolltopIfNecessary(this.transition);
    this.selectedCountry = this.countryService.getCountry(
      this.countryService.getSelectedCountryCode().getValue()
    );
    this.selectedCurrency = this.currencyService.getCurrency(
      this.currencyService.getSelectedCurrencyCode().getValue()
    );
    // global data
    this.worldTotalBiocapacity = this.pricerService.worldTotalBiocapacity / 1000000000;
    this.worldPppGdp = this.pricerService.worldPppGdp / 1000000000;
    this.globalHectarePriceIntDollars = this.worldPppGdp / this.worldTotalBiocapacity;
    this.globalSquareMeterPriceIntDollars = this.globalHectarePriceIntDollars / 10000;
    this.globalSquareMeterPriceSelectedCurrency =
      this.globalSquareMeterPriceIntDollars *
      this.selectedCountry.avgPrices *
      this.selectedCurrency.exchangeRate;
    // co2 objects
    // FIXME get from db
    this.co2Footprint = 0.000256; // in hectares per kg
    this.sampleCo2Object = this.objectService.getCo2Objects()[0];
    this.sampleCo2ObjectEcologicalFootprint = this.sampleCo2Object.ef * 10000;
    this.sampleCo2ObjectEcologicalPrice = this.pricerService.computePrice(this.sampleCo2Object);
    // crop objects
    // FIXME get from db
    this.equivalenceFactorForCropLand = 2.56;
    this.sampleCropObject = this.objectService.getCropObjects()[0];
    this.sampleCropObjectSurfaceNeeded = 0.001 * 10000 / this.sampleCropObject.details.objectYield;
    this.sampleCropObjectEcologicalPrice = this.pricerService.computePrice(this.sampleCropObject);
    // livestock objects
    this.sampleLivestockObject = this.objectService.getLivestockObjects()[0];
    this.sampleLivestockObjectEcologicalFootprint1Kg =
      this.sampleLivestockObject.details.totalEcologicalFootprint /
      this.sampleLivestockObject.details.totalProduced;
    this.sampleLivestockObjectEcologicalPrice = this.pricerService.computePrice(
      this.sampleLivestockObject
    );
    // compound objects
    this.sampleCompoundObject = this.objectService.getCompoundObjects()[2];
  }

  public getObject(objectId: number): EpObject<ObjectDetails> {
    return this.objectService.getObject(objectId);
  }

  public getPrice(objectId: number): Price {
    return this.pricerService.computePrice(this.objectService.getObject(objectId));
  }

  public getContribution(link: CompoundObjectLink): number {
    return this.getPrice(link.parentId).value * link.quantity;
  }
}
