import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { HttpBackend } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // @Output() featureSelected = new EventEmitter<string>();
  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit() {
  }
  // onSelect(feature: string){
  //   this.featureSelected.emit(feature);
  // }
  onSaveData() {
    this.dataStorageService.storeRecipes();
  }
  onFetchRecipes() {
    this.dataStorageService.fetchRecipes().subscribe();
  }
}
