import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../authentication/authentication.service';
import {Router} from '@angular/router';
import {DiaryService} from '../diary.service';
import {Topic} from '../../models/topic.model';

@Component({
  selector: 'app-topics-list',
  templateUrl: './topics-list.component.html',
  styleUrls: ['./topics-list.component.css']
})
export class TopicsListComponent implements OnInit {

  topics: Topic[] = [];

  constructor(private authService: AuthenticationService, private router: Router, private diaryService: DiaryService) { }

  ngOnInit(): void {
    if (!this.authService.isLogged())
    {
      this.router.navigate(['login']);
    }
    this.getTopics();
  }

  getTopics(): void
  {
    this.diaryService.getTopics().subscribe(res => {
      this.topics = res;
      console.log(this.topics);
    });
  }

}
