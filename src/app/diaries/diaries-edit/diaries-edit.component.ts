import { Component, OnInit } from '@angular/core';
import {Diary} from '../models/diary.model';
import {Field} from '../models/field.model';
import {DiaryService} from '../diary.service';

@Component({
  selector: 'app-diaries-edit',
  templateUrl: './diaries-edit.component.html',
  styleUrls: ['./diaries-edit.component.css']
})
export class DiariesEditComponent implements OnInit {

  diary: Diary;

  constructor(private diaryService: DiaryService) { }

  ngOnInit(): void {
    this.diaryService.getDiary().subscribe(
      result => this.diary = result
    );
  }

  addField(): void {
    this.diary.fields.push(
      {} as Field
    );
  }

  removeField(index): void {
    this.diary.fields.splice(index, 1);
  }
}
