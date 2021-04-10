import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Topic } from 'src/app/models/topic.model';
import { Record } from 'src/app/models/record.model';
import { DiaryService } from '../diary.service';

@Component({
  selector: 'app-daily-records',
  templateUrl: './daily-records.component.html',
  styleUrls: ['./daily-records.component.css'],
})
export class DailyRecordsComponent implements OnInit {
  isLoaded = false;
  recordId: string;
  dateIndex: DateIndex;
  topicResponse: Topic;
  recordForActualIndex: Record = null;
  recordsView: RecordView[] = [];

  get isSmallScreen(): boolean {
    return window.innerWidth <= 528;
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dairyService: DiaryService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.recordId = params.get('id');
      this.dairyService
        .getTopicById(this.recordId)
        .subscribe((response: Topic) => {
          this.topicResponse = response;
          this.loadData();
        });
    });
  }

  private loadData(): void {
    const dailyWeeks = this.getRangeOfWeekDays();

    // For each day we're matching corresponding report
    if (!this.isSmallScreen) {
      this.dateIndex = {
        dateAsString: this.formatDateToString(dailyWeeks[0]),
        date: dailyWeeks[0],
      };

      if (dailyWeeks != null) {
        dailyWeeks.forEach((day) => {
          const reportForTheDay: Record = this.findRecordForDate(day);
          const dateAsString = this.formatDateToString(day);

          if (reportForTheDay) {
            this.recordsView.push({
              date: day,
              dateAsString,
              record: reportForTheDay,
            });
          } else {
            this.recordsView.push({
              date: day,
              dateAsString,
              record: null,
            });
          }
        });
      }
    } else {
      this.dateIndex = {
        dateAsString: this.formatDateToString(new Date()),
        date: new Date(),
      };
      this.refreshRecordIndex();
    }
    console.log(this.recordsView);
    this.isLoaded = true;
  }

  /**
   * Format a date to string
   * @param date to format
   * @returns date formatted : DD-MM-YYYY
   */
  private formatDateToString(date: Date): string {
    const result: string =
      date.getDate().toLocaleString('fr', { minimumIntegerDigits: 2 }) +
      '-' +
      date.getMonth().toLocaleString('fr', { minimumIntegerDigits: 2 }) +
      '-' +
      date.getFullYear();

    return result;
  }

  /**
   * Find the corresponding report of the given date
   * @param dateToCompare report's date
   * @return result
   */
  private findRecordForDate(dateToCompare: Date): Record {
    return this.topicResponse.records.find((report) => {
      const date: Date = new Date(report.creationDate);
      return (
        date.getDate() === dateToCompare.getDate() &&
        date.getMonth() === dateToCompare.getMonth() &&
        date.getFullYear() === dateToCompare.getFullYear()
      );
    });
  }

  editReport(): void {
    this.router.navigate([`/daily-reports/${this.recordId}/create`], {
      relativeTo: this.route,
    });
  }

  /**
   * Get an array which contains all days of the week
   * @returns Date[]
   */
  private getRangeOfWeekDays(): Date[] {
    const weekDays: Date[] = [];
    const currentDate: Date = new Date();
    const monday: Date = this.getMondayOfTheWeek(currentDate);

    for (let i = 1; i <= 7; i++) {
      const date = new Date();
      date.setDate(monday.getDate() + i - 1);
      weekDays.push(date);
    }
    return weekDays;
  }

  getMondayOfTheWeek(date: Date): Date {
    date = new Date(date);
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }

  /**
   * Get day of the week. Ex: 10-04-2021 => Samedi
   * @param date
   */
  getDayFromDate(date: Date): string {
    let result: string;
    switch (date.getDay()) {
      case 0:
        result = 'Dimanche';
        break;
      case 1:
        result = 'Lundi';
        break;
      case 2:
        result = 'Mardi';
        break;
      case 3:
        result = 'Mercredi';
        break;
      case 4:
        result = 'Jeudi';
        break;
      case 5:
        result = 'Vendredi';
        break;
      case 6:
        result = 'Samedi';
        break;
    }
    return result;
  }

  /**
   * Refresh actual record from Index (Small screen)
   */
  private refreshRecordIndex(): void {
    if (this.dateIndex) {
      const result = this.findRecordForDate(this.dateIndex.date);
      this.recordForActualIndex = result ? result : null;
    }
  }

  changeDay(arrow: string): void {
    let ldate: Date = new Date(this.dateIndex.date);
    switch (arrow) {
      case '<':
        if (!this.isSmallScreen) {
          this.displayOtherWeek(false);
        } else {
          ldate.setDate(this.dateIndex.date.getDate() - 1);
          this.dateIndex.date = ldate;
          this.dateIndex.dateAsString = this.formatDateToString(ldate);
          this.refreshRecordIndex();
        }
        break;
      case '>':
        if (!this.isSmallScreen) {
          this.displayOtherWeek(true);
        } else {
          ldate.setDate(this.dateIndex.date.getDate() + 1);
          this.dateIndex.date = ldate;
          this.dateIndex.dateAsString = this.formatDateToString(ldate);
          this.refreshRecordIndex();
        }
        break;
    }
  }

  /**
   * @param goToNextWeek : positive == next week // negative == previous week
   */
  private displayOtherWeek(goToNextWeek: boolean): void {
    let direction: number = goToNextWeek ? 1 : -1;
    const monday = new Date(this.dateIndex.date.getTime()); // First day of the week
    monday.setDate(monday.getDate() + 7 * direction);
    const newRecordsView: RecordView[] = [];

    let itr: number;
    for (itr = 0; itr < 7; itr++) {
      const ldate = new Date(monday.getTime());
      if (goToNextWeek) {
        ldate.setDate(ldate.getDate() + direction * itr);
      } else {
        ldate.setDate(ldate.getDate() - direction * itr);
      }

      const reportForTheDay: Record = this.findRecordForDate(ldate);
      const dateAsString = this.formatDateToString(ldate);

      if (reportForTheDay) {
        newRecordsView.push({
          date: ldate,
          dateAsString,
          record: reportForTheDay,
        });
      } else {
        newRecordsView.push({
          date: ldate,
          dateAsString,
          record: null,
        });
      }
    }

    this.dateIndex.date = monday;
    this.dateIndex.dateAsString = this.formatDateToString(this.dateIndex.date);

    this.recordsView = newRecordsView;
  }
}

interface DateIndex {
  dateAsString: string;
  date: Date;
}

interface RecordView {
  date: Date;
  dateAsString: string;
  record: Record;
}
