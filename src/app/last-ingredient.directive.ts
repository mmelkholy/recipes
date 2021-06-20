import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appLastIngredient]'
})
export class LastIngredientDirective implements AfterViewInit {

  constructor(private element: ElementRef) {
    // element.nativeElement.style.color = 'red'
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if(this.element.nativeElement['appLastIngredient'] === true) this.element.nativeElement.focus()
      this.element.nativeElement.untouched = true
    }, 1);
  }

}
