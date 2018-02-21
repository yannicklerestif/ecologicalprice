import { Component, OnInit } from '@angular/core';
import { Transition } from '@uirouter/core';
import { Co2Object } from '../../model/objects/co2-object';
import { ObjectService } from '../../services/object/object.service';
import { EpObject } from '../../model/objects/ep-object';
import { CropObject } from '../../model/objects/crop-object';
import { LivestockObject } from '../../model/objects/livestock-object';
import { CompoundObject } from '../../model/objects/compound-object';
import { ScrollHelperService } from '../../services/scroll-helper.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
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
    this.co2Object = this.objectService.getCo2Objects()[0];
    this.cropObject = this.objectService.getCropObjects()[0];
    this.livestockObject = this.objectService.getLivestockObjects()[0];
    this.compoundObject = this.objectService.getCompoundObjects()[2];
  }
}
