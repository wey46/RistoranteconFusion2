import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //incline template instead of templateUrl: template: `<h1>{{title}}</h1>`
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app works!';
}

