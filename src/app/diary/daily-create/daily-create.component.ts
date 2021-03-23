import {Component, OnInit} from '@angular/core';
import {Diary} from '../../models/diary.model';
import {DiaryService} from '../diary.service';

@Component({
  selector: 'app-daily-create',
  templateUrl: './daily-create.component.html',
  styleUrls: ['./daily-create.component.css']
})
export class DailyCreateComponent implements OnInit {

  diary: Diary;
  idDiary: number;
  constructor(private diaryService: DiaryService) { }

  ngOnInit(): void {
    this.getDiary();
  }

  getDiary(): void {
    this.diaryService.getDiary().subscribe(res => {
      this.diary = res;
    });
  }
}
