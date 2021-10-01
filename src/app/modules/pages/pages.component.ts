import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  constructor() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  ngOnInit(): void {
  }

}
