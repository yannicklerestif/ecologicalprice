import { Component, OnInit, Input } from '@angular/core';
import { Price } from '../../../model/price';
import { Co2Object } from '../../../model/objects/co2-object';
import { EpObject } from '../../../model/objects/ep-object';
import { PricerService } from '../../../services/pricer.service';

@Component({
  selector: 'app-co2-details',
  templateUrl: './co2-details.component.html',
  styleUrls: [],
})
export class Co2DetailsComponent implements OnInit {
  @Input() co2Object: EpObject<Co2Object>;
  @Input() isZoomed: boolean;

  co2Footprint: number;
  globalSquareMeterPrice: Price;
  co2ObjectEcologicalFootprint: number;
  co2ObjectPrice: Price;

  constructor(private pricerService: PricerService) {}

  ngOnInit() {
    // co2 objects
    // FIXME get from db
    this.co2Footprint = 0.000256; // in hectares per kg
    this.globalSquareMeterPrice = this.pricerService.getGlobalSquareMeterPrice();
    this.co2ObjectEcologicalFootprint = this.co2Object.ef * 10000;
    this.co2ObjectPrice = this.pricerService.computePrice(this.co2Object);
  }
}
