import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
    selector: 'app-quiz-take',
    templateUrl: './quiz-take.component.html',
    styleUrls: ['./quiz-take.component.scss']
})
export class QuizTakeComponent implements OnInit {
    private id: string;
    private q: number;
    public question: string;
    public answers: string[];
    public radioSelected: string;
    public gotResult: boolean;
    public status: boolean;

    constructor(
        private apiService: ApiService,
        private router: Router,
        private route: ActivatedRoute,
    ) {
        this.route.params.subscribe(params => {
            this.id = params.id;
        });
        this.route.queryParams.subscribe(params => {
            this.q = params.q;
            this.fetchData();
        });
    }

    ngOnInit() {
        this.fetchData();
    }

    fetchData() {
        this.apiService.getQuestion(this.id, this.q).subscribe((res: any) => {
            this.question = res.question;
            this.answers = res.answers;
        });
    }

    submitAnswer() {
        this.apiService.submitAnswer(this.id, this.q, this.radioSelected).subscribe((res: any) => {
            this.gotResult = true;
            this.status = res.result === 'correct';
        });
    }

    nav(direction: 'back' | 'forward') {
        if (direction === 'back') {
            this.router.navigate([], { queryParams: { q: Number(this.q) - 1 } });
        } else {
            this.router.navigate([], { queryParams: { q: Number(this.q) + 1 } });
        }
    }
}
