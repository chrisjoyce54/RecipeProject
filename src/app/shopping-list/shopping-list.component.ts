import { Component, OnInit, OnDestroy } from '@angular/core';
import { IngredientModel } from '../shared/ingredient-model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: IngredientModel[];
  private ingredientsChangedSubscription: Subscription;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientsChangedSubscription =  this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: IngredientModel[]) => {
        this.ingredients = ingredients;
      }
    );
  }
  onEditItem(id: number) {
    this.shoppingListService.startedEditing.next(id);
  }
  ngOnDestroy(): void {
    this.ingredientsChangedSubscription.unsubscribe();
  }
  // onIngredientAdded(ingredient: IngredientModel) {
  //   this.ingredients.push(ingredient);
  // }
}
