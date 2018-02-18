import { Injectable } from '@angular/core';
import { EpObject } from '../../model/ep-object';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ObjectRepositoryService {
  constructor(private httpClient: HttpClient) {}

  public async fetchEpObjects(): Promise<EpObject[]> {
    const response = await this.httpClient.get('api/download_objects.php').toPromise();
    return (response as any[]).map(
      rawObject =>
        new EpObject(rawObject['id'], rawObject['name'], rawObject['object_type'], rawObject['EF'])
    );
  }
}
