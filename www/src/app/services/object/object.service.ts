import { Injectable } from '@angular/core';
import { EpObject } from '../../model/ep-object';
import { ObjectRepositoryService } from './object-repository.service';

@Injectable()
export class ObjectService {
  constructor(private objectRepositoryService: ObjectRepositoryService) {}

  private epObjects: { [id: number]: EpObject };

  public isLoaded: boolean = false;

  async load(): Promise<void> {
    if (this.isLoaded == true) return;
    const epObjects = {};
    const epObjectsArray = await this.objectRepositoryService.fetchEpObjects();
    epObjectsArray.forEach(epObject => (epObjects[epObject.id] = epObject));
    this.epObjects = epObjects;
    this.isLoaded = true;
  }

  getObject(id: number) {
    return this.epObjects[id];
  }

  getObjects(): EpObject[] {
    return Object.values(this.epObjects);
  }
}
