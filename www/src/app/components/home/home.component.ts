import { Component, OnInit } from '@angular/core';
import { Transition } from '@uirouter/core';
import { ScrollHelperService } from '../../services/scroll-helper.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private transition: Transition, private scrollHelperService: ScrollHelperService) {}

  ngOnInit() {
    this.scrollHelperService.scrolltopIfNecessary(this.transition);
  }
}
