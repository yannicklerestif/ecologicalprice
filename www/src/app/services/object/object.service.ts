import { Injectable } from '@angular/core';
import { EpObject } from '../../model/objects/ep-object';
import { ObjectRepositoryService } from './object-repository.service';
import { ObjectDetails } from '../../model/objects/object-details';
import { ObjectType } from '../../model/objects/object-type';
import { Co2Object } from '../../model/objects/co2-object';
import { CropObject } from '../../model/objects/crop-object';
import { LivestockObject } from '../../model/objects/livestock-object';

@Injectable()
export class ObjectService {
  constructor(private objectRepositoryService: ObjectRepositoryService) {}

  private epObjects: Map<number, EpObject<ObjectDetails>>;

  public isLoaded: boolean = false;

  private mergeObjects(
    epObjects: EpObject<ObjectDetails>[],
    detailsArray: ObjectDetails[]
  ): Map<number, EpObject<ObjectDetails>> {
    const result: Map<number, EpObject<ObjectDetails>> = new Map();
    epObjects.forEach(epObject => result.set(epObject.id, epObject));
    detailsArray.forEach(details => (result.get(details.objectId).details = details));
    // checking that no epObject was forgotten
    result.forEach(epObject => {
      if (epObject.details == null) {
        console.error('Object without details: ', epObject);
        throw new Error(`Object without details: ${epObject.id}`);
      }
    });
    return result;
  }

  async load(): Promise<void> {
    if (this.isLoaded == true) return;
    const objects = await this.objectRepositoryService.fetchObjects();
    const epObjects = this.objectRepositoryService.extractEpObjects(objects);
    this.epObjects = this.mergeObjects(epObjects, [
      ...this.objectRepositoryService.extractCo2Objects(objects),
      ...this.objectRepositoryService.extractCropObjects(objects),
      ...this.objectRepositoryService.extractLivestockObjects(objects),
      ...this.objectRepositoryService.extractCompoundObjects(objects),
    ]);
    this.isLoaded = true;
  }

  getObject(id: number): EpObject<ObjectDetails> {
    return this.epObjects.get(id);
  }

  getObjects(): EpObject<ObjectDetails>[] {
    return Array.from(this.epObjects.values());
  }

  private getObjectsOfType(type: ObjectType): EpObject<ObjectDetails>[] {
    return Array.from(this.epObjects.values()).filter(epObject => epObject.objectType === type);
  }

  getCo2Objects(): EpObject<Co2Object>[] {
    return this.getObjectsOfType(ObjectType.Co2) as EpObject<Co2Object>[];
  }

  getCropObjects(): EpObject<CropObject>[] {
    return this.getObjectsOfType(ObjectType.Crop) as EpObject<CropObject>[];
  }

  getLivestockObjects() {
    return this.getObjectsOfType(ObjectType.Livestock) as EpObject<LivestockObject>[];
  }
}
