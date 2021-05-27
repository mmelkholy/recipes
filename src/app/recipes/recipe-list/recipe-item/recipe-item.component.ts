import { Component, Input, OnInit, Output } from '@angular/core';
import { RecipeService } from 'src/app/recipe.service';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() item: Recipe

  constructor(private recipes: RecipeService) { }

  ngOnInit(): void {
  }

  onRecipeItemClick(clickEvent) {
    clickEvent.preventDefault()
    this.recipes.setClickedRecipe(this.item)
  }
}
