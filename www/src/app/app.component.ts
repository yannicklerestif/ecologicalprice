import { Component, OnInit } from '@angular/core';
import { Transition, TransitionService } from '@uirouter/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private transitionService: TransitionService) {}

  ngOnInit() {}
}
