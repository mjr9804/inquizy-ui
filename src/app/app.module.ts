import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import { QuizDetailsComponent } from './quiz-details/quiz-details.component';
import { QuizTakeComponent } from './quiz-take/quiz-take.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        QuizListComponent,
        QuizDetailsComponent,
        QuizTakeComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
