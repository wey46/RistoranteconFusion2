import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
import { FormControl } from '@angular/forms/src/model';

import { flyInOut,expand } from '../animations/app.animation';

import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: Feedback = null;
  contactType = ContactType;

  submited:boolean;
  showData: boolean
  errMess: string;

  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  validationMessages = {
    'firstname': {
      'required': 'First Name is required',
      'minlength': 'First Name must be at least 2 characters long',
      'maxlength': 'First Name cannot be more than 25 characters long'
    },
    'lastname': {
      'required': 'Last Name is required',
      'minlength': 'Last Name must be at least 2 characters long',
      'maxlength': 'Last Name cannot be more than 25 characters long'
    },
    'telnum': {
      'required': 'Tel. Num is required',
      'pattern': 'Tel. number must contain only numbers'
    },
    'email': {
      'required':'Email is required',
      'email':'Email not in valid format'
    }
  };

  constructor(private fb: FormBuilder, private feedbackservice: FeedbackService) {
    this.createForm();
  }

  ngOnInit() {

  }

  createForm(): void {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
      lastname: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
      telnum: ['', [Validators.required,Validators.pattern ]],
      email: ['', [Validators.required,Validators.email ]],
      agree: false,
      contacttype: 'None',
      message: ''
    });

    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    
    this.onValueChanged(); //reset form validation message;
  }

  onValueChanged(data?: any) {
    if(!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for(const field in this.formErrors){
      this.formErrors[field] = '';
      const control = form.get(field);
      if(control && control.dirty && !control.valid){
        const messages = this.validationMessages[field];
        for(const key in control.errors){
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  onSubmit() {
    this.submited = true;
    this.feedback = this.feedbackForm.value;
    console.log(Date() + ": "+ this.feedback);
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });

    this.feedbackservice.submitFeedback(this.feedback)
      .subscribe( 
        feedback => {
          this.showData = true;
          this.feedback = feedback;
          setTimeout(() => {
            this.submited = false;
            this.showData = false;
          }, 5000);
      },
      errMess => this.errMess = <any>errMess  
      );

    
  }

}
