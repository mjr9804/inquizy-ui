import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReportService } from '../report.service';

@Component({
    selector: 'app-score-report',
    templateUrl: './score-report.component.html',
    styleUrls: ['./score-report.component.scss']
})
export class ScoreReportComponent implements OnInit {
    public scores: any[];
    public total: number;

    constructor(
        private reportService: ReportService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.scores = this.reportService.getReport();
        if (!this.scores) {
            this.router.navigate(['/']);
        }
        let correct = 0;
        this.scores.forEach(score => {
            if (score.result) {
                correct += 1;
            }
        });
        this.total = (correct * 100) / this.scores.length;
    }
}
