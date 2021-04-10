import {DataRecord} from './data-record.model';

export interface Record {
  id: string;
  name: string;
  creationDate: string;
  dataRecords: DataRecord[];
}
