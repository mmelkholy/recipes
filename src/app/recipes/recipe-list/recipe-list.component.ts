import { Subscription } from 'rxjs';
import { Recipe } from './../recipe.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipeService } from 'src/app/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipeList: Recipe[]
  recipeListSubscription: Subscription

  constructor(private recipes: RecipeService) { }

  ngOnInit(): void {
    this.recipeList = this.recipes.listRecipes()
    this.recipeListSubscription = this.recipes.recipeListUpdated.subscribe((recipeList: Recipe[]) => {
      this.recipeList = recipeList
      console.log('updated')
    })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.recipeListSubscription.unsubscribe()
  }
}
