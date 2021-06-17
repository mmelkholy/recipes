import { Pipe, PipeTransform } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Recipe } from './recipes/recipe.model';
import { Ingredient } from './shared/ingredients.model';

@Pipe({
  name: 'recipeToForm',
  pure: false
})
export class RecipeToFormPipe implements PipeTransform {

  transform(recipe: Recipe): FormGroup {
    const ingredientsArray = new FormArray([])

    for (let ingredient of recipe.ingredients) {
      ingredientsArray.push(new FormGroup({
        'ingredientName': new FormControl(ingredient.name, [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)
        ]),
        'ingredientAmount': new FormControl(ingredient.amount, [
          Validators.required,
          Validators.min(0)
        ])
      }))
    }

    const recipeForm = new FormGroup({
      'id': new FormControl(recipe.id, [Validators.required]),
      'recipeDetails': new FormGroup({
        'recipeName': new FormControl(recipe.name, [Validators.required, Validators.minLength(3)]),
        'recipeDescription': new FormControl(recipe.description, [Validators.required, Validators.minLength(50)]),
        'imgPath': new FormControl(recipe.imgPath)
      }),
      'ingredients': ingredientsArray
    })

    return recipeForm;
  }
}

@Pipe({
  name: 'fromToRecipe'
})
export class FromToRecipePipe implements PipeTransform {

  transform(formData: FormGroup): Recipe {
    const fromIngredients = formData.get('ingredients').value
    const ingredients: Ingredient[] = []

    for (let ingredient of fromIngredients) {
      let { id, ingredientName, ingredientAmount } = ingredient
      ingredients.push(new Ingredient(
        id,
        ingredientName,
        ingredientAmount
      ))
    }

    const { id, recipeDetails } = formData.value
    const { recipeName, recipeDescription, imgPath } = recipeDetails

    return new Recipe(
      id,
      recipeName,
      recipeDescription,
      imgPath,
      ingredients
    )
  }
}
