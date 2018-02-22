import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ContactService {
  constructor(private httpClient: HttpClient) {}

  public async sendEmail(email: string, message: string): Promise<void> {
    await this.httpClient
      .post('api/send_email.php', { email: email, message: message })
      .toPromise();
  }
}
