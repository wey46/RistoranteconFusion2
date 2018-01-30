import { Injectable } from '@angular/core';

import { Leader } from '../shared/leader';
//import { LEADERS } from '../shared/leaders';
import { baseURL } from '../shared/baseurl';
//import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ProcessHttpmsgService } from './process-httpmsg.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { RestangularModule, Restangular } from 'ngx-restangular';

@Injectable()
export class LeaderService {

  constructor(private restangular: Restangular) { }

  getLeaders(): Observable <Leader[]> {
    return this.restangular.all('leaders').getList();
  }

  getLeader(id: number): Observable <Leader> {
    return this.restangular.one('leaders',id).get();
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.restangular.all('leaders').getList({ featured: true})
      .map(leaders => leaders[0]);
  }

}
