import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { FireService } from 'src/app/services/fire.service';
import { userDetails } from 'src/app/tasks';
import { Router } from '@angular/router';

@Component({
  selector: 'app-username',
  templateUrl: './username.page.html',
  styleUrls: ['./username.page.scss'],
})
export class UsernamePage implements OnInit, OnDestroy {
  
  validations_form: FormGroup
  
  message:userDetails
  subscription: Subscription
  errorMessage: string = ''


  //variaveis para validar username
  usernameList:any[];
  isvalid:boolean;

  validation_messages = {
    'username': [
      { type: 'required', message: 'Username is required.' },
      { type: 'minlength', message: 'Username is too short' },
      { type: 'duplicate', message: 'Username already exists'}
    ]
  };
  
  constructor(
    private data: DataService,
    private fire: FireService,
    private formBuilder: FormBuilder,
    private router: Router
    ) { }


  ngOnInit() {
  
    this.fire.getUsernames().subscribe(data =>{
      this.usernameList = data.map(e => {
        return  e.payload.doc.data()['username']
      })
    })
  

    this.validations_form = this.formBuilder.group({
      username: new FormControl('', Validators.compose([
        Validators.minLength(3),
        Validators.required
      ])),
    });


    this.subscription = this.data.currentMessage.subscribe(msg => {this.message = msg;})

   }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  tryRegisterUsername(value){
    console.log("tryRegisterUsername", value);

    let t: userDetails = {
      email: this.message.email,
      username: value.username
    }
    
    this.isvalid = ! this.usernameList.includes(this.validations_form.controls['username'].value)
    
    
  if(this.isvalid){
    this.fire.createUsername(t).then( res => {
      this.errorMessage = "",
      this.router.navigate(['tabs/home'])
    }, err => {
      this.errorMessage = err.message;
    })
  } else{
    this.errorMessage = "Username Already Exists"
  }
  
    
  }


}
