import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
    selector: 'app-quiz-details',
    templateUrl: './quiz-details.component.html',
    styleUrls: ['./quiz-details.component.scss']
})
export class QuizDetailsComponent implements OnInit {
    public quizName: string;
    public id: string;
    public questions: [];
    public question: string;
    public correctAnswer: string;
    public incorrectAnswer1: string;
    public incorrectAnswer2: string;
    public incorrectAnswer3: string;

    constructor(
        private apiService: ApiService,
        private route: ActivatedRoute,
    ) {
        this.route.params.subscribe(params => {
            this.id = params.id
        });
    }

    ngOnInit() {
        this.fetchData();
    }

    fetchData() {
        this.apiService.getQuiz(this.id).subscribe((res: any) => {
            this.quizName = res.name;
            this.questions = res.questions;
        });
    }


    addQuestion() {
        if (this.question && this.correctAnswer) {
            const q = {
                question: this.question,
                correct: this.correctAnswer,
                incorrect: [this.incorrectAnswer1, this.incorrectAnswer2, this.incorrectAnswer3],
            }
            this.apiService.addQuestion(this.id, q).subscribe(() => {
                this.question = '';
            });
        }
    }

}
