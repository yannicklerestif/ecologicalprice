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
  zoomedObject: EpObject<ObjectDetails>;
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

    // in zoom mode we only set the zoomed object
    if (objectId != null) {
      this.zoomedObject = this.objectService.getObject(objectId);
      if (!this.zoomedObject) throw new Error(`Couldn't find an object for objectId: ${objectId}`);
      this.co2Object =
        this.zoomedObject.objectType === ObjectType.Co2 &&
        (this.zoomedObject as EpObject<Co2Object>);
      this.cropObject =
        this.zoomedObject.objectType === ObjectType.Crop &&
        (this.zoomedObject as EpObject<CropObject>);
      this.livestockObject =
        this.zoomedObject.objectType === ObjectType.Livestock &&
        (this.zoomedObject as EpObject<LivestockObject>);
      this.compoundObject =
        this.zoomedObject.objectType === ObjectType.Compound &&
        (this.zoomedObject as EpObject<CompoundObject>);
    } else {
      // in non-zoomed mode objects are choosen randomly
      this.zoomedObject = null;
      this.co2Object = this.objectService.getCo2Objects()[0];
      this.cropObject = this.objectService.getCropObjects()[0];
      this.livestockObject = this.objectService.getLivestockObjects()[0];
      this.compoundObject = this.objectService.getCompoundObjects()[2];
    }
  }
}
