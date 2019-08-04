import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipesStartComponent } from './recipes/recipes-start/recipes-start.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
// import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { CommonModule } from '@angular/common';

const appRoutes: Routes = [
    {path: '', redirectTo: '/recipes', pathMatch: 'full'},
    {path: 'recipes', component: RecipesComponent, children: [
        {path: '', component: RecipesStartComponent},
        // {path: 'new', component: RecipeEditComponent},
        {path: ':id', component: RecipeDetailComponent},
        // {path: ':id/edit', component: RecipeEditComponent},
      ]},
      {path: 'shopping-list', component: ShoppingListComponent},
    ];
@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes),
        CommonModule
      ],
      exports: [RouterModule]
})
export class AppRoutingModule { }
