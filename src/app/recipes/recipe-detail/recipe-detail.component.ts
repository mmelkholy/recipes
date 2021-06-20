import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs';

import { IngredientService } from './../../ingredient.service';
import { Recipe } from './../recipe.model';
import { RecipeService } from 'src/app/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  subscriptions: object = {}
  currentRecipe: Recipe
  currentRoute: string
  imgStyle = {
    'background-image': 'none'
  }

  constructor(
    private recipes: RecipeService,
    private ingredients: IngredientService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  @HostListener('click') onClick() {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.currentRecipe = this.recipes.getRecipeById(+params['id'])
      if (this.currentRecipe) {
        this.imgStyle['background-image'] = 'url(' + this.currentRecipe.imgPath + ')'
      }
    })
  }

  addCurrentIngredients(): void {
    for (let ingredient of this.currentRecipe.ingredients) {
      this.ingredients.addNewIngredient(ingredient)
    }
  }

  deleteRecipe() {
    confirm('Are you sure you want to delete this recipe?')
    this.recipes.listRecipes().findIndex((item, index: number) => {
      this.recipes.deleteRecipeById(this.currentRecipe.id)
    })
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    for (let subscription in this.subscriptions) {
      let sub: Subscriber<any> = this.subscriptions[subscription]
      sub.unsubscribe()
    }
  }

}
