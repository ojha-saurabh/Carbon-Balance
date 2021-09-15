import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/global/sevices/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  payLoad = {
    email: '',
    password: '',
    confirmPassword: ''
  };

  @ViewChild('signUpForm') form: any;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit: any = () => {
    // console.log(this.form.value);
    if (this.form.valid){
      if (this.form.value.password !== this.form.value.confirmPassword){
        Swal.fire('Oops...', 'Password and confirm password should be the same.', 'error');
      }else{
        this.auth.register(this.payLoad).subscribe((response: any) => {
          if (response.status){
            this.form.reset();
            Swal.fire('Successful!!', response.message, 'success');
          }else{
            Swal.fire('Oops...', response.message, 'error');
          }
        }, (error: any) => {
          Swal.fire('Oops...', error.message, 'error');
        });
      }
    }else{
      Swal.fire('Oops...', 'Please check the madatory fields.', 'error');
    }
  }

}
