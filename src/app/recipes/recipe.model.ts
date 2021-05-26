export class Recipe {
  public name: string
  public desription: string
  public imgPath: string

  constructor(name: string, description: string, imgPath: string) {
    this.name = name
    this.desription = description
    this.imgPath = imgPath
  }
}
