import { IngredientService } from './../../ingredient.service';
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

  constructor(private ingredients: IngredientService) { }

  ngOnInit(): void {
  }

  onAddIngredient(clickEvent) {
    clickEvent.preventDefault()
    this.ingredients.addNewIngredient(new Ingredient(this.currentName.trim(), this.currentAmount))
  }

  onDeleteIngredient(event: Event): void {
    event.preventDefault()
  }
}
