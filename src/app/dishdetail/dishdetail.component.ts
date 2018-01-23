import { Component, OnInit, Inject} from '@angular/core';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Comment } from '../shared/comment';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms/src/model';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  dish: Dish;
  dishIds: number[];
  prev: number;
  next: number;

  commentForm: FormGroup;
  commentS: Comment;

  errMess: string;

  formErrors = {
    'author':'',
    'comment':''
  }

  validationMessages = {
    'author': {
      'required': 'Name is required',
      'minlength': 'Name must be at least 2 characters long'
    },
    'comment': {
      'required': 'Comment is required'
    }
  }

  constructor(
    private dishservice: DishService, 
    private location: Location, 
    private route: ActivatedRoute,
    private fb: FormBuilder,
      @Inject('BaseURL') private BaseURL) {
      this.createForm();
    }

  ngOnInit() {
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params
      .switchMap((params: Params) => this.dishservice.getDish(+params['id'])) // + is used to convert string to int; this line use observable 'params' into another observable 'dish'
    .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); },
      errmess => this.errMess = <any> errmess);
  }

  setPrevNext(dishId: number) {
    let index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1)%this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1)%this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  createForm(): void {
    this.commentForm = this.fb.group({
      author:['', [Validators.required, Validators.minLength(2)]],
      rating:5,
      comment:['', Validators.required]
    });

    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onValueChanged(data?:any) {
    if(!this.commentForm) { return; }
    const form = this.commentForm;
    for(const field in this.formErrors){
      this.formErrors[field] = '';
      const control = form.get(field);
      if(control && control.dirty && !control.valid){
        const messages = this.validationMessages[field];
        for(const key in control.errors){
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  onSubmit() { //how about date?
    
    this.commentS = this.commentForm.value;
    this.commentS.date = new Date().toISOString();
    console.log(this.commentS);
    this.commentForm.reset({
      author:'',
      rating: 5,
      comment: ''
    });
    this.dish.comments.push(this.commentS);
  }

}
