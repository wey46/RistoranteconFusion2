import { Injectable } from '@angular/core';

import { Promotion } from '../shared/promotion';
//import { PROMOTIONS } from '../shared/promotions';
import { baseURL } from '../shared/baseurl';
//import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
//import { ProcessHttpmsgService } from './process-httpmsg.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { RestangularModule, Restangular } from 'ngx-restangular';

@Injectable()
export class PromotionService {

  constructor(private restangular: Restangular) { }

  getPromotions(): Observable<Promotion[]>{
    return this.restangular.all('promotions').getList();
  }

  getPromotion(id: number): Observable<Promotion> {
    return this.restangular.one('promotions',id).get();
  }

  getFeaturedPromotion():Observable<Promotion>{
    return this.restangular.all('promotions').getList({featured: true})
      .map(promos => promos[0]);
  }

}
