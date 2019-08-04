import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { IngredientModel } from '../../shared/ingredient-model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput', {static: false}) nameInputRef: ElementRef;
  @ViewChild('amountInput', {static: false}) amountInputRef: ElementRef;
  // @Output() ingredientAdded = new EventEmitter<IngredientModel>();
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
  }
  onAddItem() {
    const newIngredient = new IngredientModel(this.nameInputRef.nativeElement.value, this.amountInputRef.nativeElement.value);
    // this.ingredientAdded.emit(newIngredient);
    this.shoppingListService.addIngredient(newIngredient);
  }
}
