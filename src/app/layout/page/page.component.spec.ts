import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageComponent } from './page.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
    template: `
        <app-page>
            <div>Test content</div>
        </app-page>
    `
})
class HostPageComponent { }

describe('PageComponent', () => {
    let component: PageComponent;
    let fixture: ComponentFixture<PageComponent>;

    let hostComponent: HostPageComponent;
    let hostFixture: ComponentFixture<HostPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                PageComponent,
                HostPageComponent
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PageComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();

        hostFixture = TestBed.createComponent(HostPageComponent);
        hostComponent = hostFixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(hostComponent).toBeTruthy();
    });

    it(`should render content`, () => {
        const content = hostFixture.debugElement.query(By.css('app-page'));
        expect(content.nativeElement.textContent).toContain('Test content');
    });
});
