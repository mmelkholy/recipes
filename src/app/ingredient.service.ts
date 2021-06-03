import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from './shared/ingredients.model';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  private ingredients: Ingredient[] = []

  ingredientListChanged = new Subject<Ingredient[]>()

  constructor() { }

  listIngredients(): Ingredient[] {
    return this.ingredients.slice()
  }

  addNewIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient)
    this.ingredientListChanged.next()
  }

}
