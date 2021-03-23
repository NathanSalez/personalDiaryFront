import {Injectable} from '@angular/core';
import {Diary} from './models/diary.model';
import {Observable, of} from 'rxjs';
import {Field} from './models/field.model';

@Injectable({
  providedIn: 'root'
})
export class DiaryService {

  constructor() {
  }

  getDiary(): Observable<Diary> {
    const diary = {
      title: 'Diary Title Test',
      fields: [
        {
          title: 'Field Title Test 1',
          unit: undefined,
          type: undefined
        } as Field,
        {
          title: 'Field Title Test 1',
          unit: undefined,
          type: undefined
        } as Field,
      ]
    } as Diary;
    return of(diary);
  }
}
