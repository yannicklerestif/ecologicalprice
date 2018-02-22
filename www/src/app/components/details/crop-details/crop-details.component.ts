import { Component, OnInit, Input } from '@angular/core';
import { Price } from '../../../model/price';
import { CropObject } from '../../../model/objects/crop-object';
import { EpObject } from '../../../model/objects/ep-object';
import { PricerService } from '../../../services/pricer.service';
import { ObjectService } from '../../../services/object/object.service';

@Component({
  selector: 'app-crop-details',
  templateUrl: './crop-details.component.html',
  styleUrls: [],
})
export class CropDetailsComponent implements OnInit {
  @Input() cropObject: EpObject<CropObject>;
  @Input() isZoomed: boolean;

  equivalenceFactorForCropLand: number;
  cropObjectSurfaceNeeded: number;
  globalSquareMeterPrice: Price;
  cropObjectPrice: Price;

  constructor(private pricerService: PricerService, private objectService: ObjectService) {}

  ngOnInit() {
    // crop objects
    // FIXME get from db
    this.equivalenceFactorForCropLand = 2.56;
    this.cropObjectSurfaceNeeded = 0.001 * 10000 / this.cropObject.details.objectYield;
    this.globalSquareMeterPrice = this.pricerService.getGlobalSquareMeterPrice();
    this.cropObjectPrice = this.pricerService.computePrice(this.cropObject);
  }
}
