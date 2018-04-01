import { Component, OnInit } from '@angular/core';
import { Transition } from '@uirouter/core';
import { ScrollHelperService } from '../../services/scroll-helper.service';
import { Constants } from '../../constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private transition: Transition, private scrollHelperService: ScrollHelperService) {}

  ngOnInit() {
    document.title = Constants.applicationTitlePrefix + 'Home';
    this.scrollHelperService.scrolltopIfNecessary(this.transition);
  }
}
