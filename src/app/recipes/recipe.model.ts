import { Ingredient } from './../shared/ingredients.model';
export class Recipe {
  public name: string
  public desription: string
  public imgPath: string
  public ingredients: Ingredient[]

  constructor(
    name: string,
    description: string,
    imgPath: string,
    ingredients: Ingredient[]
  ) {
    this.name = name
    this.desription = description
    this.imgPath = imgPath
    this.ingredients = ingredients
  }
}
