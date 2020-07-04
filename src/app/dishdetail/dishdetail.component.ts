import { Component, OnInit } from '@angular/core';
import { DISHES } from '../shared/dishes';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Dish } from '../shared/dish';
import { Params,ActivatedRoute, ParamMap} from '@angular/router';
import  {Location} from '@angular/common';
import {DishService} from '../services/dish.service';
import { LElementNode } from '@angular/core/src/render3/interfaces/node';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {


  //dishes: DISH[] = DISHES;
  // @Input()
  

  dish:Dish;
 
 // selectedDish: Dish = DISHES[0];
  // selectcommentDish:DISH= DISHES[0];
  
  constructor(private dishService:DishService,
    private route:ActivatedRoute,
    private location:Location
    ) { 

    }


  ngOnInit() {

    const id = this.route.snapshot.params['id'];
  
     this.dishService.getDish(id).then(dish=>this.dish=this.dish);;
  }

  goBack():void{
   this.location.back();

  }

}
