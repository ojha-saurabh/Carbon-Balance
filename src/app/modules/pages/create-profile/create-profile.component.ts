import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/global/sevices/auth.service';

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
  profile: any = "Choose Profile";
  banner: any = "Choose Banner";

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService
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
    let data = {
      displayName: this.profileForm.value.DisplayName,
      about: this.profileForm.value.About,
      firstName: this.profileForm.value.FirstName,
      lastName: this.profileForm.value.LastName,
      email: this.profileForm.value.EmailId,
      streetAddress: this.profileForm.value.StreetAddress,
      zipCode: this.profileForm.value.ZipCode,
      state: this.profileForm.value.State,
      age: this.profileForm.value.AgeGroup,
      occupation: this.profileForm.value.Occupation,
      termsAccepted: this.profileForm.value.isChecked,
    };
    console.log('Your order has been submitted', this.profileForm.value, this.profileForm);
    if(this.profileForm.status === 'VALID') {
      console.log('Your order has been submitted', this.profileForm.value, this.profileForm);
      this.authService.createProfile(data).subscribe((res: any) => {
        console.log('==============create profle res', res);
      })
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
    this.profile = file?.name;

    if (file) {
      
    }
  }
  selectFile1: any = (event: any) => {
    this.selectedFiles1 = event.target.files;
    console.log('==============banner=',this.selectedFiles1);
    let file1 = this.selectedFiles1?.item(0);
    this.banner = file1?.name;
  }
  upload: any = () => {
    console.log('=============up');
  }
  upload1: any = () => {

  }

}
