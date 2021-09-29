import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/global/sevices/auth.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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

  constructor(
    private auth: AuthService,
    private toastr: ToastrService,
    private router: Router
    ) { 
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }

  ngOnInit(): void {
    this.auth.getUserData();
  }

  onSubmit: any = () => {
    if (this.form.valid){
      console.log(this.form.value);
      this.auth.login(this.form.value).subscribe((response: any) => {
        this.auth.handleToken(response);
        console.log('==========response', response);
        // if(response.status == true && response.token != '' ) {
        //   this.toastr.success('Success!', 'You have loggedin Successfully');
        //   this.router.navigateByUrl('/pages/create-profile');
        // } else {
        //   this.toastr.error('oops!', response.message);
        // }
      }, (error: any) => {
        Swal.fire('Oops...', error.message, 'error');
        // this.toastr.error('oops!', error.message);
      });
    }
  }

}
