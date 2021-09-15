import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/global/sevices/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

userData: any;

constructor( private auth: AuthService ) { }

ngOnInit(): void {
  this.auth.userData.subscribe(response => {
    this.userData = response;
  });
}

}
