import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/global/sevices/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector:  'app-sign-in',
  templateUrl:  './sign-in.component.html',
  styleUrls:  ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {


  payLoad = {
    email: '',
    password: ''
  };

  @ViewChild('signInForm') form: any;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.getUserData();
  }

  onSubmit: any = () => {
    if (this.form.valid){
      console.log(this.form.value);
      this.auth.login(this.form.value).subscribe((response: any) => {
        this.auth.handleToken(response);
        console.log('=============res', response);    
        // if(response.status) {
        //   window.location.reload();
        // }   
      }, (error: any) => {
        Swal.fire('Oops...', error.message, 'error');
      });
    }
  }

}
