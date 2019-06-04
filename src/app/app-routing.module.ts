import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import { QuizDetailsComponent } from './quiz-details/quiz-details.component';
import { QuizTakeComponent } from './quiz-take/quiz-take.component';
import { ScoreReportComponent } from './score-report/score-report.component';

const routes: Routes = [
    {
        path: 'list',
        component: QuizListComponent,
    },
    {
        path: 'details/:id',
        component: QuizDetailsComponent,
    },
    {
        path: 'take/:id',
        component: QuizTakeComponent,
    },
    {
        path: 'score-report',
        component: ScoreReportComponent,
    },
    {
        path: '**',
        component: HomeComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
