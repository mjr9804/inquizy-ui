import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ReportService {
    private report: any[];

    constructor() { }

    public createReport() {
        this.report = [];
    }

    public getReport() {
        return this.report;
    }

    public addScore(index, question, result) {
        this.report[index] = { question, result };
    }
}
