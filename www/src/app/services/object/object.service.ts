import { Injectable } from '@angular/core';
import { EpObject } from '../../model/ep-object';
import { ObjectRepositoryService } from './object-repository.service';

@Injectable()
export class ObjectService {
  constructor(private objectRepositoryService: ObjectRepositoryService) {}

  private epObjects: EpObject[];

  public isLoaded: boolean = false;

  async load(): Promise<void> {
    if (this.isLoaded == true) return;
    this.epObjects = await this.objectRepositoryService.fetchEpObjects();
    this.isLoaded = true;
  }

  getObjects(): EpObject[] {
    return this.epObjects;
  }
}
