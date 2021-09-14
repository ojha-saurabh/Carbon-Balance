import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/global/sevices/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {


  payLoad = {
    email:'',
    password:''
  }

  @ViewChild("signInForm") form:any;

  constructor(private auth : AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.form.valid){
      console.log(this.form.value);
      this.auth.login(this.form.value).subscribe((response:any)=>{
        this.auth.handleToken(response);              
      })
    }
  }

}
