import { Component, OnInit } from '@angular/core';
import { DISHES } from '../shared/dishes';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Dish } from '../shared/dish';
import { Params,ActivatedRoute, ParamMap} from '@angular/router';
import  {Location} from '@angular/common';
import {DishService} from '../services/dish.service';
import { LElementNode } from '@angular/core/src/render3/interfaces/node';

import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {


  //dishes: DISH[] = DISHES;
  // @Input()
  

  dish:Dish;
  dishIds:string[];
  prev:string;
  next:string;
 
 // selectedDish: Dish = DISHES[0];
  // selectcommentDish:DISH= DISHES[0];
  
  constructor(private dishService:DishService,
    private route:ActivatedRoute,
    private location:Location
    ) { 

    }


  ngOnInit() {

  //  const id = this.route.params['id'];
  
     //this.dishService.getDish(id).subscribe(dish=>this.dish=this.dish);;
     this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
     this.route.params.pipe(switchMap((params: Params) => this.dishService.getDish(params['id'])))
     .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
  }

  goBack():void{
   this.location.back();

  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }
}
