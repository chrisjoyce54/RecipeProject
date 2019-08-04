import { Component, OnInit, Input } from '@angular/core';
import { RecipeModel } from '../../recipe-model';
// import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipeInput: RecipeModel;
  @Input() id: number;
  // @Output() recipeSelected = new EventEmitter<void>();
  // constructor(private recipeService: RecipeService) { }

  ngOnInit() {
  }

  // onSelected() {
  //   // this.recipeSelected.emit();
  //   this.recipeService.recipeSelected.emit(this.recipeInput);
  // }

}
