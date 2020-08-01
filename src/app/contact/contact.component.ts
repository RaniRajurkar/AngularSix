import { Component, OnInit,ViewChild ,Inject} from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import { from } from 'rxjs';
import {Feedback,ContactType} from '../shared/feedback';
import {FeedbackService} from '../services/feedback.service';

import { flyInOut,expand } from '../animations/app.animation';
import { ActivatedRoute } from '@angular/router';

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


  feedbackForm:FormGroup;
  feedback:Feedback;
  feedbackCopy:Feedback;
  contactType=ContactType;
  submitted:boolean=false;
  firstname:String;
  lastname:String;
  email:String;
  contacttype:String;
  message:String;
  agree:boolean;
  telnum:number;
  hideForm: boolean;
  hideResponse: boolean;
  hideSpinner: boolean;

 
  errMessage:String;
  msg:String;
  @ViewChild('fform') feedbackFormDirective;

  showSpinner = false;

  loadData() {
    this.showSpinner = true;
    setTimeout(() => {
      if(this.feedback!=null){
        this.showSpinner = false;
      }
     
    }, 5000);
   
  }
    formErrors={
      'firstname':'',
      'lastname':'',
      'telnum':'',
      'email':''

    };
    validationMessages = {
      'firstname': {
        'required':      'First Name is required.',
        'minlength':     'First Name must be at least 2 characters long.',
        'maxlength':     'FirstName cannot be more than 25 characters long.'
      },
      'lastname': {
        'required':      'Last Name is required.',
        'minlength':     'Last Name must be at least 2 characters long.',
        'maxlength':     'Last Name cannot be more than 25 characters long.'
      },
      'telnum': {
        'required':      'Tel. number is required.',
        'pattern':       'Tel. number must contain only numbers.'
      },
      'email': {
        'required':      'Email is required.',
        'email':         'Email not in valid format.'
      },
    };

  

  constructor(private feedbackService:FeedbackService, private route:ActivatedRoute,private fb:FormBuilder,@Inject('BaseURL') private BaseURL) {
    this.createForm();
   }

  ngOnInit() {
    this.hideForm = false
    this.hideSpinner = true
    this.hideResponse = true

  }
createForm():void{

     this.feedbackForm =this.fb.group({
      firstname: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
      lastname: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
      telnum: [0,[Validators.required,Validators.pattern]],
      email: ['',[Validators.required,Validators.email]],
      agree: false,
      contacttype: 'None',
      message: ''
     });

     this.feedbackForm.valueChanges.subscribe(data=>this.onValueChanged(data));

     this.onValueChanged();
}

onSubmit(){
  this.feedback =this.feedbackForm.value;
  this.hideForm= true;
  this.hideSpinner=false;
 // this.submitted=true;
 this.firstname=this.feedback.firstname;
 this.lastname=this.feedback.lastname;
 this.email=this.feedback.email;
 this.contacttype=this.feedback.contacttype;
 this.agree=this.feedback.agree;
 this.message=this.feedback.message;
 this.telnum=this.feedback.telnum;
 //   this.displayMessage('Saved ');
 // console.log(this.feedback);

 this.feedbackService.submitFeedback(this.feedback)
 .subscribe(feedback => {
 this.feedback = feedback; this.feedbackCopy=feedback; 
this.hideSpinner=true;
this.hideResponse = false;
 setTimeout(() => {
  this.hideForm = false;
  this.hideResponse = true;}, 5000);
},
errmess => { this.feedback = null;  this.feedbackCopy = null; this.errMessage = <any>errmess; });



  this.feedbackForm.reset({
    firstname:'',
    lastname:'',
    telnum:0,
    agree:false,
    contacttype:'None',
    message:''
  });
  this.feedbackFormDirective.resetForm();
}
 /** Display a message briefly, then remove it. */
    displayMessage(msg: string) {
       this.msg = msg;
       setTimeout(() => this.msg = '', 1500);
    }
onValueChanged(data?:any){

   if(!this.feedbackForm){ return;  }
const form= this.feedbackForm;
for(const field in this.formErrors){
if(this.formErrors.hasOwnProperty(field)){
  //clear previous error message (if any)
 this.formErrors[field]='';
 const control= form.get(field);
 if(control && control.dirty && !control.valid){
  const messages= this.validationMessages[field];
  for(const key in control.errors){
   if(control.errors.hasOwnProperty(key)){
     this.formErrors[field] +=messages[key]+' ';
   }
 }

 }

}
}

}

}

