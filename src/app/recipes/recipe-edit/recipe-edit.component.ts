import { Recipe } from './../recipe.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';

import { RecipeService } from 'src/app/recipe.service';
import { Subject, Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredients.model';



@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  // global subscriptions object to be cleared
  subscriptions = {}
  recipeForm: FormGroup
  ingredients: FormArray
  editMode: boolean = false
  loadedRecipe: Recipe

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
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
          this.fillLoadedRecipe(currentRecipe)

        } else {
          // arbitrary id, navigate to add new recipe
          this.router.navigate(['../../', 'new'], { relativeTo: this.route })
        }
      } else {
        // MEANS WE'RE IN THE NEW RECIPE PAGE
        this.fillLoadedRecipe(this.initializeNewRecipe())
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
    const newIngredients: Ingredient[] = []
    for (let ingredient of this.formIngredients) {
      newIngredients.push(
        new Ingredient(
          ingredient.ingredientId,
          ingredient.ingredientName,
          ingredient.ingredientAmount
        )
      )
    }

    const { id, recipeDetails } = this.recipeForm.value
    const newRecipe = new Recipe(
      id,
      recipeDetails.recipeName,
      recipeDetails.recipeDescription,
      recipeDetails.imgPath,
      newIngredients
    )

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
    this.ingredients.push(
      new FormGroup({
        'ingredientId': new FormControl(id),
        'ingredientName': new FormControl('New Ingredient'),
        'ingredientAmount': new FormControl(1)
      })
    )
  }

  removeThisIngredient(index: number) {
    this.ingredients.removeAt(index)
  }

  resetForm() {
    if (this.editMode) {
      this.fillLoadedRecipe(this.loadedRecipe)
    } else {
      this.initializeNewRecipe()
    }
  }

  /** A FUNCTION TO FILL THE FROM WITH A RECIPE DETAILS */
  private fillLoadedRecipe(recipe: Recipe): void {
    const { id, name, description, imgPath, ingredients } = recipe

    // PREPARE THE INGREDIENTS ARRAY
    const ingredientsArray: FormArray = new FormArray([])
    for (let ingredient of ingredients) {
      ingredientsArray.push(
        new FormGroup({
          'ingredientId': new FormControl(ingredient.id),
          'ingredientName': new FormControl(ingredient.name),
          'ingredientAmount': new FormControl(ingredient.amount)
        })
      )
    }

    // SET THE GLOBL INGREDIENTS VALUE
    this.ingredients = ingredientsArray

    // FILL THE RECIPE FROM FROM THE RETREIVED RECIPE
    this.recipeForm = new FormGroup({
      'id': new FormControl(id, [Validators.required]),
      'recipeDetails': new FormGroup({
        'recipeName': new FormControl(name, [Validators.required]),
        'recipeDescription': new FormControl(description, Validators.required),
        'imgPath': new FormControl(imgPath)
      }),
      'ingredients': this.ingredients
    })
  }

  /** A FUNCTION TAHT RETURNS A BLANK NEW RECIPE */
  private initializeNewRecipe(): Recipe {
    return new Recipe(
      this.recipeService.listRecipes().length + 1,
      'New Recipe',
      'Please add recipe description here',
      null,
      []
    )
  }

}
