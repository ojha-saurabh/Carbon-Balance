import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/global/sevices/auth.service';
import { NgStyle } from '@angular/common';

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
  userEmail: any = 'ramyapenjerla@gmail.com';
  userData: any;

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
    let userdetails = this.authService.getDecodedUserdata();
    let data = {
      email: userdetails.email,
      id: userdetails.id
    }
    this.authService.getUserByEmail(data).subscribe((res: any) => {
      console.log('===uuser data', res);
      if(res.status) {
        this.userData = res.data;
        this.profileForm.patchValue({
          DisplayName: this.userData.displayName,
          About: this.userData.about,
          FirstName: this.userData.firstName,
          LastName: this.userData.lastName,
          StreetAddress: this.userData.streetAddress,
          ZipCode: this.userData.zipCode,
          EmailId: this.userData.email,
          Occupation: this.userData.occupation,
          State: this.userData.state,
          AgeGroup: this.userData.age,
          isChecked: this.userData.termsAccepted
        })
      }
    })
    this.profileForm.controls['EmailId'].disable();
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
      email: this.userData.email,
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
        if(res.status) {
          this.toastr.success('Profile Updated Successfully!', 'Success!');
          this.router.navigateByUrl('/pages/calculate-co2');
        }
      })
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
