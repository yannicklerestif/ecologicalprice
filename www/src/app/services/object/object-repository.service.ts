import { Injectable } from '@angular/core';
import { EpObject } from '../../model/objects/ep-object';
import { HttpClient } from '@angular/common/http';
import { Co2Object } from '../../model/objects/co2-object';
import { CropObject } from '../../model/objects/crop-object';
import { LivestockObject } from '../../model/objects/livestock-object';
import { CompoundObject } from '../../model/objects/compound-object';
import { CompoundObjectLink } from '../../model/objects/compound-object-link';
import { ObjectDetails } from '../../model/objects/object-details';

@Injectable()
export class ObjectRepositoryService {
  constructor(private httpClient: HttpClient) {}

  public async fetchObjects(): Promise<any> {
    return await this.httpClient.get('api/download_objects.php').toPromise();
  }

  public extractEpObjects(objects: any): EpObject<ObjectDetails>[] {
    return (objects['p_object'] as any[]).map(
      rawEpObject =>
        new EpObject(
          rawEpObject['id'],
          rawEpObject['name'],
          rawEpObject['object_type'],
          rawEpObject['EF']
        )
    );
  }

  public extractCo2Objects(objects: any): Co2Object[] {
    return (objects['p_CO2_object'] as any[]).map(
      rawCo2Object => new Co2Object(rawCo2Object['object_id'], rawCo2Object['CO2_cost'])
    );
  }

  public extractCropObjects(objects: any): CropObject[] {
    return (objects['p_crop_object'] as any[]).map(
      rawCropObject =>
        new CropObject(
          rawCropObject['object_id'],
          rawCropObject['FAO_code'],
          rawCropObject['yield'],
          rawCropObject['crop_intensity']
        )
    );
  }

  public extractLivestockObjects(objects: any): LivestockObject[] {
    return (objects['p_livestock_object'] as any[]).map(
      rawLivestockObject =>
        new LivestockObject(
          rawLivestockObject['object_id'],
          rawLivestockObject['total_produced'],
          rawLivestockObject['total_ecological_footprint'],
          rawLivestockObject['retail_cut_percent']
        )
    );
  }

  public extractCompoundObjects(objects: any): CompoundObject[] {
    const links: CompoundObjectLink[] = (objects['p_compound_object_link'] as any[]).map(
      rawCompoundObjectLink =>
        new CompoundObjectLink(
          rawCompoundObjectLink['object_id'],
          rawCompoundObjectLink['parent_id'],
          rawCompoundObjectLink['quantity']
        )
    );
    const result: { [id: number]: CompoundObject } = {};
    links.forEach(link => {
      let compoundObject = result[link.objectId];
      if (compoundObject == null) {
        compoundObject = new CompoundObject(link.objectId, []);
        result[compoundObject.objectId] = compoundObject;
      }
      compoundObject.links.push(link);
    });
    return Object.values(result);
  }
}
