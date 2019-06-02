import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    public list: any[];

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

}
