import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanDeactivateGuardService } from './can-deactivate-guard.service';
import { RecipeContainerComponent } from './recipes/recipe-container/recipe-container.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const routes: Routes = [
  {
    path: 'recipes', component: RecipesComponent, children: [
      { path: '', component: RecipeContainerComponent },
      { path: 'new', component: RecipeEditComponent, canDeactivate: [] },
      { path: ':id', component: RecipeDetailComponent },
      { path: ':id/edit', component: RecipeEditComponent, canDeactivate: [] },
      {path: '**', redirectTo: '', pathMatch: 'full'}
  ] },
  {
    path: 'shopping-list', component: ShoppingListComponent, children: [
      { path: 'edit', component: ShoppingEditComponent }
    ]
  },
  {
    path: '', redirectTo: '/recipes', pathMatch: 'full'
  },
  {
    path: '**', redirectTo: '/recipes'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
