import { Component, OnInit } from '@angular/core';

import { Spinkit } from 'ng-http-loader'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'recipes'
  clicked: string = 'Recipes'

  public spinkit = Spinkit

  constructor() { }

  ngOnInit() {}

  handleClick(elementName) {
    this.clicked = elementName
    console.log(this.clicked)
  }
}
