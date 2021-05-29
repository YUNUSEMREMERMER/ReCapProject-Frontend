import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: string[] = ['Tüm Arabalar', 'Brand', 'Color', 'Rent', 'Customer'];

  currentCategory: string = 'Car';

  constructor() { }

  ngOnInit(): void {
  }

  setCurrentCategory(category: string) {
    this.currentCategory = category;
  }

  getCurrentCategory(category: string) {
    if (category == this.currentCategory) {
      return "list-group-item active bg-dark";
    } else {
      return "list-group-item ";
    }
  }



}
