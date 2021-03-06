import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
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
    public newQuestionModal: BsModalRef;
    public addResult: boolean;
    public showResult = false;

    constructor(
        private apiService: ApiService,
        private modalService: BsModalService,
        private route: ActivatedRoute,
    ) {
        this.route.params.subscribe(params => {
            this.id = params.id;
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

    showModal(template: TemplateRef<any>) {
        this.newQuestionModal = this.modalService.show(template, { class: 'modal-lg' });
    }

    hideModal() {
        this.newQuestionModal.hide();
        this.fetchData();
    }

    addQuestion() {
        if (this.question && this.correctAnswer) {
            const q = {
                question: this.question,
                correct: this.correctAnswer,
                incorrect: [this.incorrectAnswer1, this.incorrectAnswer2, this.incorrectAnswer3],
            };
            this.apiService.addQuestion(this.id, q)
                .pipe(
                    catchError(err => {
                        console.log(err);
                        this.addResult = false;
                        this.showResult = true;
                        return EMPTY;
                    }),
                )
                .subscribe(() => {
                    this.question = '';
                    this.correctAnswer = '';
                    this.incorrectAnswer1 = '';
                    this.incorrectAnswer2 = '';
                    this.incorrectAnswer3 = '';
                    this.showResult = true;
                    this.addResult = true;
                    setTimeout(() => {
                        this.showResult = false;
                    }, 3000);
                }
            );
        }
    }

    delete(questionId: string) {
        this.apiService.deleteQuestion(this.id, questionId).subscribe(() => {
            this.fetchData();
        });
    }
}
