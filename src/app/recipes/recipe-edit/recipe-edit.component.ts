import { Ingredient } from 'src/app/shared/ingredients.model';
import { Recipe } from './../recipe.model';
import { RecipeService } from 'src/app/recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { CanDeactivateGuard } from 'src/app/can-deactivate-guard.service';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy, CanDeactivateGuard {
  subscriptions: object = {}
  recipe: Recipe
  editMode = false
  pageName: string

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipes: RecipeService
  ) { }

  ngOnInit(): void {
    this.subscriptions['id'] = this.route.params.subscribe(
      (params: Params) => {
        // If editing get the target recipe
        const fetchedRecipe = this.recipes.getRecipeById(+params['id'])
        if (fetchedRecipe) { // If there's a recipe, make the edit
          this.editMode = true
          console.log(this.route)
          this.recipe = fetchedRecipe
        } else if (params['id']) { // If there's no recipe but the user wanted to edit, make a new one
          this.router.navigate(['../../new'], { relativeTo: this.route })
        } else { // I'm sure there's no recipe here
          this.recipe = new Recipe(
            this.recipes.listRecipes().length + 1,
            'Recipe Name',
            'Please add your recipe description here',
            null,
            [new Ingredient(
              this.recipes.listRecipes().length + '-0',
              'Ingredient Name',
              0
            )]
          )
        }

        // Based on the the assigned editMode value while initializing, the page title will be decided
        this.pageName = this.editMode ? "Edit Recipe" : "New Recipe"

        // This makes a new instance of the recipe item in hands so that any changed due to the two way binding will not reflect on any other component before saving. In case of a new recipe being added, this will initialize a new recipe.
        if (this.editMode) {
          console.log(this.editMode)
          const NewRecipe = new Recipe(
            this.recipe.id,
            this.recipe.name,
            this.recipe.desription,
            this.recipe.imgPath,
            this.recipe.ingredients
          );
          this.recipe = NewRecipe
        } else { }
      }
    )
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    for (let subscription in this.subscriptions) {
      console.log()
      let sub: Subscriber<any> = this.subscriptions[subscription]
      sub.unsubscribe()
    }
  }

  // Add ingredient action
  addNewIngredient() {
    this.recipe.ingredients.push(new Ingredient(
      this.recipe.id + '-' + this.recipe.ingredients.length,
      'Ingredient Name',
      0
    ))
  }

  // Remove Ingredient action
  removeThisIngredient(ingredientName) {
    const index: number = this.recipe.ingredients.findIndex(
      (ingredient: Ingredient, index) => {
        ingredient.name !== ingredientName
        return index
      })
    console.log(index)
    console.log(this.recipe.ingredients)
    this.recipe.ingredients = this.recipe.ingredients.filter((item: Ingredient, n) => n !== index)
  }

  // Submit button action - EDIT ONLY
  saveChanges() {
    console.log(this.recipe.id)
    if (this.editMode) {
      this.recipes.updateRecipe(this.recipe)
      console.log(this.recipes.listRecipes())
    } else {
      this.recipes.addNewRecipe(this.recipe)
      console.log(this.recipes.listRecipes())
    }
    this.navigateToBaba()
  }

  // Reset button action
  resetForm() {
    this.recipe = this.recipes.getRecipeById(this.recipe.id)
  }

  // function to exit edit screen and return to the recipe page
  navigateToBaba() {
    this.router.navigate(['../'], { relativeTo: this.route })
  }

  // Add Image
  addImgLink(file: File) {
    console.log(file)
  }

  // Delete Image



  // canDeactivate Route Guard
  CanDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    let equal: boolean = true
    if (this.recipes.getRecipeById(this.recipe.id)) { // means we're editing
      const thisRecipe: Recipe = this.recipe,
        originalRecipe: Recipe = this.recipes.getRecipeById(this.recipe.id)

      for (let key in thisRecipe) {
        if (thisRecipe[key] !== originalRecipe[key]) {
          equal = false
          break
        }
      }
    } else { // adding a new item
      equal = false
    }

    return !equal ? confirm('Discard Changes?') : true;
  }

}
