import { Injectable } from '@angular/core';
import { EpObject } from '../../model/ep-object';
import { ObjectRepositoryService } from './object-repository.service';
import { Co2ObjectRepositoryService } from './co2-object-repository.service';
import { Co2Object } from '../../model/co2-object';
import { ObjectService } from './object.service';

@Injectable()
export class Co2ObjectService {
  constructor(private co2ObjectRepositoryService: Co2ObjectRepositoryService) {}

  private co2Objects: Co2Object[];

  public isLoaded: boolean = false;

  async load(): Promise<void> {
    if (this.isLoaded == true) return;
    this.co2Objects = await this.co2ObjectRepositoryService.fetchCo2Objects();
    this.isLoaded = true;
  }

  getSampleCo2Object(): Co2Object {
    return this.co2Objects[0];
  }
}
