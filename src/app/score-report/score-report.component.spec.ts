import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreReportComponent } from './score-report.component';

describe('ScoreReportComponent', () => {
    let component: ScoreReportComponent;
    let fixture: ComponentFixture<ScoreReportComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ScoreReportComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ScoreReportComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
