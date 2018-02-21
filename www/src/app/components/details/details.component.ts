import { Component, OnInit } from '@angular/core';
import { Transition } from '@uirouter/core';
import { Co2Object } from '../../model/objects/co2-object';
import { ObjectService } from '../../services/object/object.service';
import { EpObject } from '../../model/objects/ep-object';
import { CropObject } from '../../model/objects/crop-object';
import { LivestockObject } from '../../model/objects/livestock-object';
import { CompoundObject } from '../../model/objects/compound-object';
import { ScrollHelperService } from '../../services/scroll-helper.service';
import { ObjectDetails } from '../../model/objects/object-details';
import { ObjectType } from '../../model/objects/object-type';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  isZoomMode: boolean;
  co2Object: EpObject<Co2Object>;
  cropObject: EpObject<CropObject>;
  livestockObject: EpObject<LivestockObject>;
  compoundObject: EpObject<CompoundObject>;

  constructor(
    private transition: Transition,
    private objectService: ObjectService,
    private scrollHelperService: ScrollHelperService
  ) {}

  ngOnInit() {
    this.scrollHelperService.scrolltopIfNecessary(this.transition);
    const objectId = this.transition.params().objectId;
    this.isZoomMode = !!objectId;

    // in zoom mode we only set the zoomed object
    if (this.isZoomMode) {
      const zoomed: EpObject<ObjectDetails> = this.objectService.getObject(objectId);
      if (!zoomed) throw new Error(`Couldn't find an object for objectId: ${objectId}`);
      this.co2Object = zoomed.objectType === ObjectType.Co2 && (zoomed as EpObject<Co2Object>);
      this.cropObject = zoomed.objectType === ObjectType.Crop && (zoomed as EpObject<CropObject>);
      this.livestockObject =
        zoomed.objectType === ObjectType.Livestock && (zoomed as EpObject<LivestockObject>);
      this.compoundObject =
        zoomed.objectType === ObjectType.Compound && (zoomed as EpObject<CompoundObject>);
    } else {
      // in non-zoomed mode objects are choosen randomly
      this.co2Object = this.objectService.getCo2Objects()[0];
      this.cropObject = this.objectService.getCropObjects()[0];
      this.livestockObject = this.objectService.getLivestockObjects()[0];
      this.compoundObject = this.objectService.getCompoundObjects()[2];
    }
  }
}
