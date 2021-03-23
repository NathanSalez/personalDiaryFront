import { Component, OnInit } from '@angular/core';
import { DailyReport } from '../../models/daily-report.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-daily-reports',
  templateUrl: './daily-reports.component.html',
  styleUrls: ['./daily-reports.component.css'],
})
export class DailyReportsComponent implements OnInit {
  isLoaded = false;
  dailyReportsViews: Map<number, DailyReportsView> = new Map();
  idDiary: number;

  // TODO: Link with id of diary

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idDiary = params.id;
      console.log(params);
    });
    this.loadData();
  }

  private loadData(): void {
    // CALL HTTP
    // dfoisdfoisjfisjfoisjfsejfoisjf

    const dailyWeeks = this.getRangeOfWeekDays();
    let i = 1;
    dailyWeeks.forEach((day) => {
      this.dailyReportsViews.set(i, {
        date: day,
        dailyReport: {
          id: '' + i,
          date: null,
          title: 'Lorem ipsum',
        },
      });
      i++;
    });

    this.dailyReportsViews.get(3).dailyReport = null;

    this.isLoaded = true;
  }

  editReport(report: DailyReportsView): void {
    if (report == null) {
      this.router.navigate([`/daily-reports/edit`], {
        relativeTo: this.route,
      });
    } else {
      this.router.navigate([`/daily-reports/edit`], {
        queryParams: {
          id: report.dailyReport.id,
        },
        relativeTo: this.route,
      });
    }
  }

  getRangeOfWeekDays(): Date[] {
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

  getDayFromDate(date: Date): any {
    return date.getDate();
  }

  getMonthFromDate(date: Date): any {
    return date.getMonth();
  }

  getYearFromDate(date: Date): any {
    return date.getFullYear();
  }

  getDayAsString(date: number): any {
    let result: string;
    switch (date) {
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
      case 7:
        result = 'Dimanche';
        break;
    }
    return result;
  }

  canDisplayBorder(date: number): boolean {
    return date > 1;
  }

  getViewFromMap(dailyView: any): DailyReportsView {
    return dailyView as DailyReportsView;
  }
}

export enum ReportDayEnum {
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
  SUNDAY,
}

export class DailyReportsView {
  date: Date;
  dailyReport: DailyReport;
}
