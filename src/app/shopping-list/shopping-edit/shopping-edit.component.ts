import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { IngredientModel } from '../../shared/ingredient-model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput', {static: false}) nameInputRef: ElementRef;
  // @ViewChild('amountInput', {static: false}) amountInputRef: ElementRef;
  // @Output() ingredientAdded = new EventEmitter<IngredientModel>();
  @ViewChild('f', {static: false}) shoppingListForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: IngredientModel;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (id: number) => {
          this.editedItemIndex = id;
          this.editMode = true;
          this.editedItem = this.shoppingListService.getIngredient(id);
          this.shoppingListForm.setValue({
            nameControl: this.editedItem.name,
            amountControl: this.editedItem.amount
          });
      }
    );
  }
  onSubmit(form: NgForm) {
    // const newIngredient = new IngredientModel(this.nameInputRef.nativeElement.value, this.amountInputRef.nativeElement.value);
    // this.ingredientAdded.emit(newIngredient);
    const value = form.value;
    const newIngredient = new IngredientModel(value.nameControl, value.amountControl);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
    this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }
  onClear() {
    this.shoppingListForm.reset();
    this.editMode = false;
  }
  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
