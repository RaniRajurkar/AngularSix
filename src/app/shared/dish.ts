import { Type } from "@angular/core";
//import { type } from "os";
import {Comment} from './comment';
    import { from } from "rxjs";

export class Dish {
    id: string;
    name: string;
    image: string;
    category: string;
    featured: boolean;
    label: string;
    price: string;
    description: string;
    comments:Comment[];
   
}

// export class DISH {
//     id: string;
//     name: string;
//     image: string;
//     category: string;
//     featured: boolean;
//     label: string;
//     price: string;
//     description: string;
     
//    // comments: { rating: number, comment: string ,author:string,date:string}[];

          
//  } 
   



