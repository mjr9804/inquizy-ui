import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Md5 } from 'md5-typescript';

@Component({
    selector: 'app-quiz-take',
    templateUrl: './quiz-take.component.html',
    styleUrls: ['./quiz-take.component.scss']
})
export class QuizTakeComponent implements OnInit {
    private id: string;
    private q: number;
    private quiz: any;
    public question: string;
    public answers: string[];
    public radioSelected: string;
    public gotResult: boolean;
    public status: boolean;
    public showBack = false;
    public showForward = true;

    constructor(
        private apiService: ApiService,
        private router: Router,
        private route: ActivatedRoute,
    ) {
        this.route.params.subscribe(params => {
            this.id = params.id;
        });
    }

    ngOnInit() {
        this.q = 0;
        this.fetchData();
    }

    fetchData() {
        this.apiService.takeQuiz(this.id).subscribe((res: any) => {
            this.quiz = res;
            this.showQuestion();
        });
    }

    showQuestion() {
        this.gotResult = false;
        this.question = this.quiz.questions[this.q].question;
        this.answers = this.quiz.questions[this.q].answers;
    }

    submitAnswer() {
        const hash = Md5.init(this.radioSelected);
        const correctHash = this.quiz.questions[this.q].correct;
        this.status = hash === correctHash;
        this.gotResult = true;
    }

    nav(direction: 'back' | 'forward') {
        if (direction === 'back') {
            this.q -= 1;
        } else {
            this.q += 1;
        }
        this.showBack = this.q > 0;
        this.showForward = this.q < this.quiz.questions.length - 1;
        this.showQuestion();
    }
}
