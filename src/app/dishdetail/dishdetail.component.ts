import { Component, OnInit,Input } from '@angular/core';
import { DISHES } from '../shared/dishes';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Dish } from '../shared/dish';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {


  //dishes: DISH[] = DISHES;
  @Input()
    dish:Dish;
 // selectedDish: Dish = DISHES[0];
  // selectcommentDish:DISH= DISHES[0];
  
  constructor() { }

  ngOnInit() {
  }

}
