import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news-and-events',
  templateUrl: './news-and-events.component.html',
  styleUrls: ['./news-and-events.component.css']
})
export class NewsAndEventsComponent implements OnInit {

  constructor() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  ngOnInit(): void {
  }

}
