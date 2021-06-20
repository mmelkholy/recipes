import { Recipe } from './../recipe.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';

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
  addedIngredient: boolean = false

  @ViewChild('[appLastIngredient]', {read: 'ElementRef'}) private lastIngredient: ElementRef

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
        } else {
          // arbitrary id, navigate to add new recipe
          this.router.navigate(['../../', 'new'], { relativeTo: this.route })
        }
      } else {
        // MEANS WE'RE IN THE NEW RECIPE PAGE
        this.loadedRecipe = this.blankRecipe
      }
      // FILL IN THE RECIPE DATA
      this.recipeForm = this.recipeToFromPipe.transform(this.loadedRecipe)

      //focus the added ingredient input
      console.log((<FormArray>this.recipeForm.get('ingredients')).length > this.loadedRecipe.ingredients.length)
      this.addedIngredient = (<FormArray>this.recipeForm.get('ingredients')).length > this.loadedRecipe.ingredients.length ? true : false
    })
  }

  ngOnDestroy(): void {
    for (let subscription in this.subscriptions) {
      this.subscriptions[subscription].unsubscribe()
    }
  }

  submitRecipe() {
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
        'ingredientName': new FormControl('New Ingredient', [Validators.required]),
        'ingredientAmount': new FormControl(0, [Validators.required, Validators.min(0)])
      })
    );
    this.addedIngredient = (<FormArray>this.recipeForm.get('ingredients')).length > this.loadedRecipe.ingredients.length ? true : false
    console.log((<FormArray>this.recipeForm.get('ingredients')).length > this.loadedRecipe.ingredients.length)
  }

  removeThisIngredient(index: number) {
    this.ingredients.removeAt(index)
  }

  trackByIndex(index: number, item: any): number {
    return index
  }

  resetForm() {
    this.recipeForm = this.recipeToFromPipe.transform(
      this.editMode? this.loadedRecipe : this.blankRecipe
    )
  }
}
