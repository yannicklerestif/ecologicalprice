import { Component, OnInit, Input } from '@angular/core';
import { EpObject } from '../../../model/objects/ep-object';
import { Price } from '../../../model/price';
import { LivestockObject } from '../../../model/objects/livestock-object';
import { PricerService } from '../../../services/pricer.service';

@Component({
  selector: 'app-livestock-details',
  templateUrl: './livestock-details.component.html',
  styleUrls: [],
})
export class LivestockDetailsComponent implements OnInit {
  @Input() livestockObject: EpObject<LivestockObject>;

  globalSquareMeterPrice: Price;
  livestockObjectFootprint1Kg: number;
  livestockObjectPrice: Price;

  constructor(private pricerService: PricerService) {}

  ngOnInit() {
    this.globalSquareMeterPrice = this.pricerService.getGlobalSquareMeterPrice();
    this.livestockObjectFootprint1Kg =
      this.livestockObject.details.totalEcologicalFootprint /
      this.livestockObject.details.totalProduced;
    this.livestockObjectPrice = this.pricerService.computePrice(this.livestockObject);
  }
}
