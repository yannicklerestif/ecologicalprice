import { Injectable } from '@angular/core';
import { EpObject } from '../../model/ep-object';
import { HttpClient } from '@angular/common/http';
import { Co2Object } from '../../model/co2-object';

@Injectable()
export class Co2ObjectRepositoryService {
  constructor(private httpClient: HttpClient) {}

  public async fetchCo2Objects(): Promise<Co2Object[]> {
    const response = await this.httpClient.get('api/download_co2_objects.php').toPromise();
    return (response as any[]).map(
      rawCo2Object => new Co2Object(rawCo2Object['object_id'], rawCo2Object['CO2_cost'])
    );
  }
}
