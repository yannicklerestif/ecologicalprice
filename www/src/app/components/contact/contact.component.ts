import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { SimpleDialogComponent } from '../simple-dialog/simple-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SimpleDialogInput } from '../simple-dialog/simple-dialog-input';
import { ErrorStateMatcher } from '@angular/material/core';
import { Constants } from '../../constants';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;

  matcher = new MyErrorStateMatcher();

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private contactService: ContactService
  ) {}

  ngOnInit() {
    document.title = Constants.applicationTitlePrefix + 'Contact';
    this.createForm();
  }

  private createForm() {
    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  public async send() {
    try {
      await this.contactService.sendEmail(
        this.contactForm.get('email').value,
        this.contactForm.get('message').value
      );
      this.dialog.open(SimpleDialogComponent, {
        width: '350px',
        data: new SimpleDialogInput(
          'Message Successfully sent!',
          'Your message was successfully sent! Thank you for your interest.'
        ),
      });
      this.contactForm.reset({ email: '', message: '' });
      this.contactForm.markAsUntouched();
      this.contactForm.markAsPristine();
    } catch (e) {
      console.error('error while sending email', e);
      this.dialog.open(SimpleDialogComponent, {
        width: '300px',
        data: new SimpleDialogInput(
          'Error Sending Message',
          'Sorry, there was an error sending your message. Please try again later.'
        ),
      });
    }
  }
}
