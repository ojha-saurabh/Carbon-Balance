import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.css']
})
export class CreateProfileComponent implements OnInit {

  profileForm: any;
  isChecked = false;
  selectedFiles?: FileList;
  selectedFiles1?: FileList;
  submitted = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.profileForm = this.fb.group({
      DisplayName: ['', Validators.required],
      About: ['', Validators.required],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      StreetAddress: ['', Validators.required],
      ZipCode: ['', Validators.required],
      EmailId: ['', Validators.required],
      Occupation: ['', Validators.required],
      State: ['', Validators.required],
      AgeGroup: ['', Validators.required],
      isChecked: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onCheckChange: any = (event: any) => {
    if(this.profileForm.value.isChecked === true) {
      console.log('===========hiii');
      this.isChecked = true;
    } else {
      console.log('1111111111111111===========hiii');
      this.isChecked = false;
    }
  }
 
  get f() { return this.profileForm.controls; }

  onSubmit: any = () => {
    this.submitted = true;
    if(this.profileForm.pristine) {
      console.log('Your order has been submitted', this.profileForm.value, this.profileForm);
      this.toastr.success('Profile Updated Successfully!', 'Success!');
    } else {
      this.toastr.error('Please Fill the Required Fields to Update Profile!', 'Error!');
    }
    // this.profileForm.controls['DisplayName'].markAsTouched()
  }

  selectFile: any = (event: any) => {
    this.selectedFiles = event.target.files;
    console.log('============profile pic===',this.selectedFiles);
    console.log('===============',this.selectedFiles?.item(0));
    let file = this.selectedFiles?.item(0);

    if (file) {
      
    }
  }
  selectFile1: any = (event: any) => {
    this.selectedFiles1 = event.target.files;
    console.log('==============banner=',this.selectedFiles1);
  }
  upload: any = () => {
    console.log('=============up');
  }
  upload1: any = () => {

  }

}
