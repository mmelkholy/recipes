import { Component, Input, OnInit, Output } from '@angular/core';
import { RecipeService } from 'src/app/recipe.service';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() item: Recipe = null

  imgUrl

  constructor(private recipes: RecipeService) { }

  ngOnInit(): void {
    this.imgUrl = this.item.imgPath ? `url(${this.item.imgPath})` : `url('http://127.0.0.1/public/images/img-placeholder.jpeg')`
  }
}
