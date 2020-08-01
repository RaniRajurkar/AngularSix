import { Component, OnInit,ViewChild,Inject } from '@angular/core';
import { DISHES } from '../shared/dishes';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Dish } from '../shared/dish';
import { Params,ActivatedRoute, ParamMap} from '@angular/router';
import  {Location} from '@angular/common';
import {DishService} from '../services/dish.service';
import { LElementNode } from '@angular/core/src/render3/interfaces/node';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider';
// import { Options } from 'ng5-slider';
import {Options} from 'ng5-slider'; 
import { switchMap } from 'rxjs/operators';
import {Feedback,ContactType} from '../shared/feedback'
import { Comment } from '../shared/comment';
import { visibility ,expand,flyInOut} from '../animations/app.animation';



@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  animations: [visibility(),flyInOut(),
  expand()]
})
export class DishdetailComponent implements OnInit {


  //dishes: DISH[] = DISHES;
  // @Input()
  

  dish:Dish;
  dishIds:string[];
  prev:string;
  next:string;
  commentForm:FormGroup;
  dishcopy: Dish;
  visibility = 'shown';
  @ViewChild('fform') commentFormDirective;
  // aurthorName = ''; 
  // textComment =''; 
  // aurthorname:string;
  // message:string;
 // inputGiven:boolean=false;

  comment: Comment;
  errMess: string;
  
 // selectedDish: Dish = DISHES[0];
  // selectcommentDish:DISH= DISHES[0];

  value: String="5";
  options: Options = {
    
      floor: 0,
      ceil: 5,
 
      step: 1,
      showTicks: true,
     
  
  };
  formErrors={
    'aurthor':'',
    'comment':''

  };
  validationMessages = {
    'aurthor': {
      'required':      'Author Name is required.',
      'minlength':     'Author Name must be at least 2 characters long.',
      'maxlength':     'Author cannot be more than 25 characters long.'
    },
    'comment':{
      'required':      'Comment is required.',

    }
  };


  constructor(private dishService:DishService,
    private route:ActivatedRoute,
    private location:Location,private fb:FormBuilder,@Inject('BaseURL') private BaseURL) { 
      
    }
    createForm():void{

      this.commentForm =this.fb.group({
        author: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
        rating: 5,
       comment: ['',[Validators.required]]
      });
 
      this.commentForm.valueChanges.subscribe(data=>this.onValueChanged(data));
 
    //  this.onValueChanged();
   
 }
 
 
 onValueChanged(data?:any){

  if(!this.commentForm){ return;  }
const form= this.commentForm;
for(const field in this.formErrors){
if(this.formErrors.hasOwnProperty(field)){
 //clear previous error message (if any)
this.formErrors[field]='';
const control= form.get(field);
if(control && control.dirty && !control.valid){
 const messages= this.validationMessages[field];
 for(const key in control.errors){
  if(control.errors.hasOwnProperty(key)){
    this.formErrors[field] +=messages[key]+' ';
  }
}

}

}

}
// this.comment = this.commentForm.value;

}
  ngOnInit() {
    this.createForm();
  //  const id = this.route.params['id'];
  
     //this.dishService.getDish(id).subscribe(dish=>this.dish=this.dish);;
    this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds, errmess => this.errMess = <any>errmess);
    // this.dishService.getDishIds().subscribe(function(dishIds) {this.dishIds = dishIds} );
    this.route.params.pipe(switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishService.getDish(params['id']); }))
    .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown'; },
      errmess => this.errMess = <any>errmess);}
  // OnUpdateAurthorName(event: Event) {  
  //   this.inputGiven=true; 
  //   this.aurthorName = (<HTMLInputElement>event.target).value;  
  // }  
  // OnUpdateTextComment(event: Event) {  
 
  //   this.textComment = (<HTMLInputElement>event.target).value;  
  // }  
  // OnUpdateValue(event: Event) {  
    
  //   this.value = (<HTMLInputElement>event.target).value; 
   
  // } 

  goBack():void{
   this.location.back();

  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }
  
onSubmit(){
  this.comment = this.commentForm.value;
  this.comment.date = Date.now().toString();
  
  this.dishcopy.comments.push(this.comment);
  this.dishService.putDish(this.dishcopy)
  .subscribe(dish => {  
    this.dish = dish; this.dishcopy = dish;
  },
  errmess => { this.dish = null; this.dishcopy = null; this.errMess = <any>errmess; });
  console.log(this.comment);
  // this.commentFormDirective.resetForm();
  this.commentForm.reset({
    author:'',
    rating: 5,
    comment:''
  });
 
}

}
