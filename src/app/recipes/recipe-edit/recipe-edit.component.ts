import { Recipe } from './../recipe.model';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';

import { RecipeService } from 'src/app/recipe.service';



@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
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
          console.log(this.loadedRecipe)

          // FILL IN THE RECIPE DATA
          this.fillLoadedRecipe(currentRecipe)

        } else {
          // arbitrary id, navigate to add new recipe
          this.router.navigate(['../../', 'new'], {relativeTo: this.route})
        }
      } else {
        // MEANS WE'RE IN THE NEW RECIPE PAGE
        this.initializeNewRecipe()
      }
    })
  }

  submitRecipe() {
    console.log(this.recipeForm.value)
  }

  addNewIngredient() {
    this.ingredients.push(
      new FormGroup({
        'ingredientName': new FormControl('New Ingredient'),
        'ingredientAmount': new FormControl(1)
      })
    )
    console.log(this.ingredients)
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

  /** A FUNCTION TO INITIALIZE THE FORM FOR A NEW RECIPE */
  private initializeNewRecipe(): void {
    // PREPARE THE GLOBALE INGREDIENTS ARRAY
    this.ingredients = new FormArray([
      new FormGroup({
        'ingredientName': new FormControl('New Ingredient Name', Validators.required),
        'ingredientAmount': new FormControl(0, Validators.required)
      })
    ])

    // INITIALIZE A BLANK RECIPE FORM
    this.recipeForm = new FormGroup({
      'id': new FormControl(this.recipeService.listRecipes().length + 1, [Validators.required]),
      'recipeDetails': new FormGroup({
        'recipeName': new FormControl('New Recipe', [Validators.required]),
        'recipeDescription': new FormControl('Recipe Description', Validators.required),
        'imgPath': new FormControl(null)
      }),
      'ingredients': this.ingredients
    })
  }

}
