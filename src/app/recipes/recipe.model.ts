import { Ingredient } from './../shared/ingredients.model';
export class Recipe {
  public id: number
  public name: string
  public description: string
  public imgPath: string
  public ingredients: Ingredient[]

  constructor(
    id: number,
    name: string,
    description: string,
    imgPath: string,
    ingredients: Ingredient[]
  ) {
    this.id = id
    this.name = name
    this.description = description
    this.imgPath = imgPath
    this.ingredients = ingredients
  }
}
