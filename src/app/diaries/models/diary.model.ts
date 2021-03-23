import {Field} from './field.model';

export interface Diary {
  title: string;
  goal: string;
  deadline: string;
  fields: Field[];
}
