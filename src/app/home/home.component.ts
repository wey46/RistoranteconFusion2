import { Component, OnInit, Inject } from '@angular/core';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';

import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  dishErrMess: string; 
  promoErrMess: string;
  leaderErrMess: string;
  
  constructor(private leaderservice: LeaderService, private dishservice: DishService, private promotionservice: PromotionService, @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.dishservice.getFeaturedDish().subscribe(dish => this.dish = dish,
      errmess => this.dishErrMess = <any>errmess);
    this.promotionservice.getFeaturedPromotion().subscribe(promo => this.promotion = promo,
      errmess => this.promoErrMess = <any>errmess);
    this.leaderservice.getFeaturedLeader().subscribe(leader => this.leader = leader,
      errmess => this.leaderErrMess = <any>errmess);
  }

}
