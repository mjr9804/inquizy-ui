import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private api = environment.baseUrl;
    private listUrl = `${this.api}/quiz`;
    private detailsUrl = `${this.api}/details`;
    private takeUrl = `${this.api}/take`;

    private jsonHeader = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })
    };

    constructor(
        private http: HttpClient,
    ) { }

    public getList() {
        return this.http.get(this.listUrl);
    }

    public createNew(name) {
        return this.http.post(this.listUrl, { name }, this.jsonHeader);
    }

    public getQuiz(id: string) {
        return this.http.get(`${this.detailsUrl}/${id}`);
    }

    public addQuestion(id, q) {
        return this.http.put(`${this.detailsUrl}/${id}`, q, this.jsonHeader);
    }

    public takeQuiz(id) {
        return this.http.get(`${this.takeUrl}/${id}`);
    }

    public deleteQuestion(id: string, questionId: string) {
        return this.http.delete(`${this.detailsUrl}/${id}/${questionId}`);
    }
}
