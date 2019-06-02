import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
    selector: 'app-quiz-list',
    templateUrl: './quiz-list.component.html',
    styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {
    public list = [];
    public newName: string;

    constructor(
        private apiService: ApiService,
    ) { }

    ngOnInit() {
        this.fetchData();
    }

    fetchData() {
        this.apiService.getList().subscribe((res: any[]) => {
            this.list = res;
        });
    }

    createNewQuiz() {
        if (this.newName) {
            this.apiService.createNew(this.newName).subscribe(() => {
                this.newName = '';
            });
        }
    }

}
