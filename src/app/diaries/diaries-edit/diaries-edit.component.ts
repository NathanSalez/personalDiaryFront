import { Component, OnInit } from '@angular/core';
import {Diary} from '../models/diary.model';
import {Field} from '../models/field.model';
import {DiaryService} from '../diary.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-diaries-edit',
  templateUrl: './diaries-edit.component.html',
  styleUrls: ['./diaries-edit.component.css']
})
export class DiariesEditComponent implements OnInit {

  diary: Diary;

  constructor(private diaryService: DiaryService, private router: Router) { }

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

  save(): void {
    this.diaryService.save().subscribe(
      result => {
        if (result.statusCode === 200) {
          alert('Saved!');
          this.router.navigate(['/']);
        } else {
          alert('Error...');
        }
      }
    );
  }
}
