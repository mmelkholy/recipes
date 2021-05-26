import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @Output() clicked: EventEmitter<Text> = new EventEmitter<Text>()
  @ViewChild('firstMenuElement') firstMenuElement: ElementRef
  activeNow: string = 'Recipes'

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
      this.activeNow = this.firstMenuElement.nativeElement.name
  }

  handleClick(event) {
    event.preventDefault()
    this.clicked.emit(event.target.name)
    this.activeNow = event.target.name
  }
}
