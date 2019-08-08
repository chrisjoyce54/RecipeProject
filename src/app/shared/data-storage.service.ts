import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { RecipeModel } from '../recipes/recipe-model';
import {map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  baseUrl = 'https://ng-recipe-book-2773d.firebaseio.com/recipes.json';

constructor(private http: HttpClient, private recipeService: RecipeService) { }

storeRecipes() {
  const recipes = this.recipeService.getRecipes();
  this.http.put(this.baseUrl, recipes).subscribe(response => {
    console.log(response);
  });
}
fetchRecipes() {
  return this.http.get<RecipeModel[]>(this.baseUrl)
  .pipe(
    map(recipes => {
    return recipes.map(recipe => {
      return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
    });
  }),
  tap(recipes => {
    this.recipeService.setRecipes(recipes);
  })
  );
  // replacesd by tap and resolver
  // .subscribe(
  //   recipes => {
  //     this.recipeService.setRecipes(recipes);
  //     console.log(recipes);
  //   }
  // );
}
}
