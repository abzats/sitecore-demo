import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingComponent } from './loading.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
    template: `
        <app-loading [loading]="loading"></app-loading>
    `
})
class HostLoadingComponent {
    loading = true;
}

describe('LoadingComponent', () => {
    let component: LoadingComponent;
    let fixture: ComponentFixture<LoadingComponent>;


    let hostComponent: HostLoadingComponent;
    let hostFixture: ComponentFixture<HostLoadingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                LoadingComponent,
                HostLoadingComponent
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoadingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        hostFixture = TestBed.createComponent(HostLoadingComponent);
        hostComponent = hostFixture.componentInstance;
        hostFixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(hostComponent).toBeTruthy();
    });

    it('should apply loading parameter', async(() => {
        let loading = hostFixture.debugElement.query(By.css('.loader'));
        expect(loading).toBeTruthy();

        hostComponent.loading = false;
        hostFixture.detectChanges();
        hostFixture.whenStable()
            .then(() => {
                let loading = hostFixture.debugElement.query(By.css('.loader'));
                expect(loading).toBeFalsy();
            });
    }));
});
