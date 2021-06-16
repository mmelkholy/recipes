import { IngredientService } from './../../ingredient.service';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  editSubscription: Subscription
  currentIngredient: Ingredient = this.initializeIngredient()
  editingIndex: number = null

  constructor(private ingredients: IngredientService) { }

  ngOnInit(): void {
    this.editSubscription = this.ingredients.startEditing.subscribe((index: number) => {
      if (index !== null) {
        this.currentIngredient = this.ingredients.getIngredientByIndex(index)
        this.editingIndex = index
      } else {
        this.editingIndex = null
      }
    })
  }

  ngOnDestroy(): void {
    this.editSubscription.unsubscribe()
  }

  onSubmit(formData: NgForm): void {
    const { ingredientName, amount } = formData.value
    const id = this.ingredients.listIngredients().length + ''
    this.editingIndex !== null ?
      this.ingredients.modifyIngredientByIndex(this.editingIndex, this.currentIngredient)
      :
      this.ingredients.addNewIngredient(new Ingredient(id, ingredientName, amount))
    this.currentIngredient = this.initializeIngredient()
    this.editingIndex = null
    this.ingredients.doneEditing()
  }

  onDeleteIngredient(): void {
    this.ingredients.removeIngredientByIndex(this.editingIndex)
    this.ingredients.doneEditing()
    this.currentIngredient = this.initializeIngredient()
  }

  onResetForm(f: NgForm): void {
    this.currentIngredient = this.initializeIngredient()
    this.ingredients.doneEditing()
  }

  /** Initialize currentIngredient Value */
  private initializeIngredient(): Ingredient {
    return new Ingredient(this.ingredients.listIngredients().length + '', '', 0)
  }
}
