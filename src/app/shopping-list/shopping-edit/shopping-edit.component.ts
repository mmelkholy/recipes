import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredients.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  currentName: string = ''
  currentAmount: number = 0

  @Output() newIngredient = new EventEmitter<Ingredient>()

  constructor() { }

  ngOnInit(): void {
  }

  onAddIngredient(clickEvent) {
    clickEvent.preventDefault()
    this.newIngredient.emit(new Ingredient(
      this.currentName.trim(),
      this.currentAmount
    ))
  }
}
