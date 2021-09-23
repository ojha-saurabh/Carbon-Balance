import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/global/sevices/auth.service';
import { NgStyle } from '@angular/common';

import Swal from 'sweetalert2';
import { CarbonService } from 'src/app/global/sevices/carbon.service';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.css']
})
export class CreateProfileComponent implements OnInit {

  profileForm: any;
  isChecked = false;
  selectedFiles?: File;
  selectedFiles1?: File;
  submitted = false;
  profile: any = 'Choose Profile';
  banner: any = 'Choose Banner';
  userEmail: any = 'ramyapenjerla@gmail.com';
  userData: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private carbon: CarbonService
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
    const userdetails = this.authService.getDecodedUserdata();
    const data = {
      email: userdetails.email,
      id: userdetails.id
    };
    this.authService.getUserByEmail(data).subscribe((res: any) => {
      if (res.status) {
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
        });
      }
    });
    this.profileForm.controls.EmailId.disable();
  }

  onCheckChange: any = (event: any) => {
    if (this.profileForm.value.isChecked === true) {
      this.isChecked = true;
    } else {
      this.isChecked = false;
    }
  }

  get f() { return this.profileForm.controls; }

  onSubmit: any = () => {
    this.submitted = true;
    const data = {
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
    // console.log('Your order has been submitted', this.profileForm.value, this.profileForm);
    if (this.profileForm.status === 'VALID') {
      // console.log('Your order has been submitted', this.profileForm.value, this.profileForm);
      this.authService.createProfile(data).subscribe((res: any) => {
<<<<<<< HEAD
      });
      this.toastr.success('Profile Updated Successfully!', 'Success!');
=======
        console.log('==============create profle res', res);
        if(res.status) {
          this.toastr.success('Profile Updated Successfully!', 'Success!');
          this.router.navigateByUrl('/pages/calculate-co2');
        }
      })
>>>>>>> f8178832e5affdab9ec89e5bbd0dc1dba5f8271a
    } else {
      this.toastr.error('Please Fill the Required Fields to Update Profile!', 'Error!');
    }
    // this.profileForm.controls['DisplayName'].markAsTouched()
  }

  selectFile: any = (event: any) => {
    this.selectedFiles = event.target.files[0];
    // console.log(event.target.files[0]);
    this.profile = event.target.files[0].name;

    if (this.selectedFiles) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You want to update your profile picture.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, upload it!',
        cancelButtonText: 'No, leave it'
      }).then((result) => {
        if (result.isConfirmed) {
          const userdetails = this.authService.getDecodedUserdata();
          const data = {
            id: userdetails.id,
            fileData: event.target.files[0],
            type: 'profile'
          };
          this.carbon.updateProfileOrBannerPicture(data)
          .subscribe((res: any) => {
              if (res.status){
                Swal.fire(
                  'Successfull!!!',
                  'Profile pic has been updated successfully.',
                  'success'
                );
              }else{
                Swal.fire(
                  'Failed!!!',
                  'Something went wrong.',
                  'error'
                );
              }
            });
          }
      });
    }
  }

  selectFile1: any = (event: any) => {
    this.selectedFiles1 = event.target.files[0];
    // console.log(event.target.files[0]);
    this.banner = event.target.files[0].name;
    if (this.selectedFiles1) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You want to update your banner picture.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, upload it!',
        cancelButtonText: 'No, leave it'
      }).then((result) => {
        if (result.isConfirmed) {
          const userdetails = this.authService.getDecodedUserdata();
          const data = {
            id: userdetails.id,
            fileData: event.target.files[0],
            type: 'banner'
          };
          this.carbon.updateProfileOrBannerPicture(data)
          .subscribe((res: any) => {
              if (res.status){
                Swal.fire(
                  'Successfull!!!',
                  'Banner pic has been updated successfully.',
                  'success'
                );
              }else{
                Swal.fire(
                  'Failed!!!',
                  'Something went wrong.',
                  'error'
                );
              }
            });
          }
      });
    }
  }
}
