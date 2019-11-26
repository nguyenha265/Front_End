import {Component, OnInit} from '@angular/core';
import {UserService} from './FRESH-FOOD/service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {


  constructor(private userService: UserService) {

  }
  ngOnInit() {
  }

}
