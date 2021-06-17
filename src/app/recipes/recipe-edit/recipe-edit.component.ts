import { Recipe } from './../recipe.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';

import { RecipeService } from 'src/app/recipe.service';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { FromToRecipePipe, RecipeToFormPipe } from 'src/app/recipe-to-form.pipe';



@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
  providers: [
    FromToRecipePipe,
    RecipeToFormPipe
  ]
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  // global subscriptions object to be cleared
  subscriptions = {}
  recipeForm: FormGroup
  ingredients: FormArray
  editMode: boolean = false
  loadedRecipe: Recipe

  blankRecipe: Recipe = new Recipe(
    this.recipeService.listRecipes().length + 1,
    'New Recipe',
    'Please add recipe description here',
    null,
    [
      new Ingredient((
        this.recipeService.listRecipes.length + 1) + '-' + (1),
        'New Ingredient',
        0
      )])

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private recipeToFromPipe: RecipeToFormPipe,
    private fromToRecipePipe: FromToRecipePipe
  ) { }

  ngOnInit(): void {
    // DETECT THE ROUTE & SET THE EDITMODE FLAG
    this.subscriptions['route'] = this.route.params.subscribe((params: Params) => {
      if (params['id']) { // We have an id - try getting a recipe
        let currentRecipe = this.recipeService.getRecipeById(+params['id'])

        if (currentRecipe) {
          //The ID matched an existing recipe - load it

          // SET THE EDIT MODE FLAG TO TRUE & PREPARE THE loadedRecipe PROPERTY FOR THE RESET FUNCTIONALITY
          this.editMode = true
          this.loadedRecipe = currentRecipe

          // FILL IN THE RECIPE DATA
          this.recipeForm = this.recipeToFromPipe.transform(currentRecipe)

        } else {
          // arbitrary id, navigate to add new recipe
          this.router.navigate(['../../', 'new'], { relativeTo: this.route })
        }
      } else {
        // MEANS WE'RE IN THE NEW RECIPE PAGE
        this.recipeForm = this.recipeToFromPipe.transform(this.blankRecipe)
      }
    })
  }

  ngOnDestroy(): void {
    for (let subscription in this.subscriptions) {
      this.subscriptions[subscription].unsubscribe()
    }
  }

  get formIngredients() {
    return this.recipeForm.get('ingredients').value
  }



  submitRecipe() {
    /* const newIngredients: Ingredient[] = []
    for (let ingredient of this.formIngredients) {
      newIngredients.push(
        new Ingredient(
          ingredient.ingredientId,
          ingredient.ingredientName,
          ingredient.ingredientAmount
        )
      )
    }

    const { id, recipeDetails } = this.recipeForm.value */

    const newRecipe = this.fromToRecipePipe.transform(this.recipeForm)

    if (this.editMode) { // edit current recipe
      this.recipeService.updateRecipe(newRecipe)
    } else { // submit a new recipe
      this.recipeService.addNewRecipe(newRecipe)
    }

    this.router.navigate(['..'], {relativeTo: this.route})
  }

  addNewIngredient() {
    let id: string
    if (this.editMode) {
      id = this.loadedRecipe.id + '-' + ((this.recipeForm.get('ingredients') as FormArray).length + 1)
    } else {
      id = (this.recipeService.listRecipes().length + 1) + '-' + ((this.recipeForm.get('ingredients') as FormArray).length + 1)
    }
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        'ingredientId': new FormControl(id),
        'ingredientName': new FormControl('New Ingredient'),
        'ingredientAmount': new FormControl(0)
      })
    )
  }

  removeThisIngredient(index: number) {
    this.ingredients.removeAt(index)
  }

  resetForm() {
    this.recipeForm = this.recipeToFromPipe.transform(
      this.editMode? this.loadedRecipe : this.blankRecipe
    )
  }
}
