import { Component, OnInit } from '@angular/core';
import {Diary} from '../models/diary.model';
import {Field} from '../models/field.model';
import {DiaryService} from '../diary.service';

@Component({
  selector: 'app-diaries-edit',
  templateUrl: './diary-edit.component.html',
  styleUrls: ['./diary-edit.component.css']
})
export class DiaryEditComponent implements OnInit {

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