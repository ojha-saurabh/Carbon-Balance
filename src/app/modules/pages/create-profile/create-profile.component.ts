import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/global/sevices/auth.service';
import { NgStyle } from '@angular/common';

import Swal from 'sweetalert2';
import { CarbonService } from 'src/app/global/sevices/carbon.service';
import { environment } from 'src/environments/environment';

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
  userdetails:any;
  imageBaseUrl: any; 
  bannerImage: any;
  profileImage: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private carbon: CarbonService
  ) {   
    document.body.scrollTop = document.documentElement.scrollTop = 0;
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
    this.userdetails = this.authService.getDecodedUserdata();    
  }

  ngOnInit(): void {       
    this.imageBaseUrl = environment.imageBaseUrl;
    this.profileImage = environment.imageBaseUrl+'noImage.png';
    this.bannerImage = environment.imageBaseUrl+'noImage.png'; 
    
    this.getUser();
    this.profileForm.controls.EmailId.disable();
  }

  getUser: any = () => {
    const data = {
      email: this.userdetails.email,
      id: this.userdetails.id
    };
    this.authService.getUserByEmail(data).subscribe((res: any) => {
      if (res.status) {
        this.userData = res.data;
        // this.profile = (res.data.profileImage)?res.data.profileImage:'Choose Profile';
        // this.banner = (res.data.bannerImage)?res.data.bannerImage:'Choose Banner';
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
        if(res.data.profileImage && res.data.profileImage!=''){
          this.profileImage = environment.imageBaseUrl+res.data.profileImage;
        }
        if(res.data.bannerImage && res.data.bannerImage!=''){
          this.bannerImage = environment.imageBaseUrl+res.data.bannerImage;
        }
      }
    });
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
        if(res.status) {
          // this.toastr.success('Profile Updated Successfully!', 'Success!');
          localStorage.setItem('displayName',this.profileForm.value.DisplayName);
          Swal.fire(
            'Successfull!!!',
            'Profile Updated Successfully.',
            'success'
          );
          this.router.navigateByUrl('/pages/calculate-co2');
          this.authService.getUserData();
        }
      })
    } else {
      this.toastr.error('Please Fill the Required Fields to Update Profile!', 'Error!');
      // Swal.fire(
      //   'Failed!!!',
      //   'Please Fill the Required Fields to Update Profile.',
      //   'error'
      // );
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
          const data = {
            id: this.userdetails.id,
            fileData: event.target.files[0],
            type: 'profile'
          };
          this.carbon.updateProfileOrBannerPicture(data)
          .subscribe((res: any) => {
              if (res.status){
                this.getUser();
                this.profile ="Choose profile";
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
          const data = {
            id: this.userdetails.id,
            fileData: event.target.files[0],
            type: 'banner'
          };
          this.carbon.updateProfileOrBannerPicture(data)
          .subscribe((res: any) => {
              if (res.status){
                this.getUser();
                this.banner ="Choose banner";
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
