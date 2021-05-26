import { Recipe } from './../recipe.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe("Pasta Recipe", "This is the decription of the pasta recipe", "http://127.0.0.1/public/images/pasta.jpeg"),
    new Recipe("Other Pasta", "I love Pasta as You can GUESS!", "http://127.0.0.1/public/images/pasta2.jpeg")
  ]


  @Output() onForwardRecipeDetails: EventEmitter<Recipe> = new EventEmitter<Recipe>()

  constructor() { }

  ngOnInit(): void {
  }

  onClickedRecipeReceived(recipe: Recipe) {
    this.onForwardRecipeDetails.emit(recipe)
  }

}
