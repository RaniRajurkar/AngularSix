import { Component, OnInit,Inject } from '@angular/core';
import { Dish } from '../shared/dish';
 import {DishService} from '../services/dish.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

    dishes: Dish[];
    selectedDish:Dish;//dish:Dish;

  constructor(private dishService:DishService, @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.dishService.getDishes()
    .subscribe(dishes => this.dishes = dishes);
  }




}
