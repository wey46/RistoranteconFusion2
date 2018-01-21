import { Injectable } from '@angular/core';
import {Dish} from '../shared/dish';
import {DISHES} from '../shared/dishes';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class DishService {

  constructor() { }

  getDishes(): Observable< Dish[] >{
    return Observable.of(DISHES);
  }

  getDish(id: number): Observable <Dish> {
    return Observable.of(DISHES.filter((dish) => (dish.id === id))[0]);
  }

  getFeaturedDish():Observable <Dish>{
    return Observable.of(DISHES.filter((dish) => dish.featured)[0]);
  }

  getDishIds(): Observable<number[] > {
    return Observable.of(DISHES.map(dish => dish.id));
  }

}
