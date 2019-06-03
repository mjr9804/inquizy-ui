import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ApiService } from '../api.service';

@Component({
    selector: 'app-quiz-list',
    templateUrl: './quiz-list.component.html',
    styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {
    public newQuizModal: BsModalRef;
    public list = [];
    public newName: string;

    constructor(
        private apiService: ApiService,
        private modalService: BsModalService
    ) { }

    ngOnInit() {
        this.fetchData();
    }

    fetchData() {
        this.apiService.getList().subscribe((res: any[]) => {
            this.list = res;
        });
    }

    showModal(template: TemplateRef<any>) {
        this.newQuizModal = this.modalService.show(template, {class: 'modal-lg'});
    }

    hideModal() {
        this.newQuizModal.hide();
    }

    createNewQuiz() {
        if (this.newName) {
            this.apiService.createNew(this.newName).subscribe(() => {
                this.newName = '';
                this.newQuizModal.hide();
                this.fetchData();
            });
        }
    }

}
