import { IngredientService } from './../../ingredient.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  constructor(private ingredients: IngredientService) { }

  ngOnInit(): void {
  }

  onAddIngredient(formData: NgForm) {
    /**Should be fixed to add ingredient id */
    // this.ingredients.addNewIngredient(new Ingredient(this.currentName.trim(), this.currentAmount))
    console.log(formData.value)
    const { ingredientName, amount } = formData.value
    const id = this.ingredients.listIngredients().length + ''
    this.ingredients.addNewIngredient(new Ingredient(id, ingredientName, amount))
  }

  onDeleteIngredient(event: Event): void {
    event.preventDefault()
  }
}
