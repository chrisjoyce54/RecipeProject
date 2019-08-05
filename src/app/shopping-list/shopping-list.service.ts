import { Injectable, EventEmitter } from '@angular/core';
import { IngredientModel } from '../shared/ingredient-model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  // ingredientsChanged = new EventEmitter<IngredientModel[]>();
  ingredientsChanged = new Subject<IngredientModel[]>();
  startedEditing = new Subject<number>();
  private ingredients: IngredientModel[] = [
    new IngredientModel('Apples', 5),
    new IngredientModel('Potatos', 10)
  ];

  constructor() { }

  getIngredients() {
    return this.ingredients.slice();
  }
  getIngredient(id: number) {
    return this.ingredients[id];
  }
  addIngredient(ingredient: IngredientModel) {
    this.ingredients.push(ingredient);
    // this.ingredientsChanged.emit(this.ingredients.slice());
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  addIngredients(ingredients: IngredientModel[]) {
    this.ingredients.push(...ingredients);
    // this.ingredientsChanged.emit(this.ingredients.slice());
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  updateIngredient(index: number, newIngredient: IngredientModel) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  deleteIngredient(id: number) {
    this.ingredients.splice(id, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
