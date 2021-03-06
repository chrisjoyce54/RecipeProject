import { Injectable, EventEmitter } from '@angular/core';
import { RecipeModel } from './recipe-model';
import { IngredientModel } from '../shared/ingredient-model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<RecipeModel[]>();
  recipes: RecipeModel[] = [];

  // recipeSelected = new EventEmitter<RecipeModel>();
  // recipeSelected = new Subject<RecipeModel>(); - now handled by router
  // private recipes: RecipeModel[] = [
  //   new RecipeModel('Tasty Schnitzel',
  //     'A super-tasty Schnitzel - just awesome!',
  //     'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
  //     [
  //       new IngredientModel('Meat', 1),
  //       new IngredientModel('French Fries', 20)
  //     ]),
  //   new RecipeModel('Big Fat Burger',
  //     'What else you need to say?',
  //     'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
  //     [
  //       new IngredientModel('Buns', 2),
  //       new IngredientModel('Meat', 1)
  //     ])
  // ];

  constructor(private shoppingListService: ShoppingListService) { }

  setRecipes(recipes: RecipeModel[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }
  getRecipe(id: number) {
    console.log('recipes Service ' + id);
    return this.recipes[id];
  }
  addIngredientsToShoppingList(ingredients: IngredientModel[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
  addRecipe(recipe: RecipeModel) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, newRecipe: RecipeModel) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }
  deleteRecipe(id: number) {
    this.recipes.splice(id, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
