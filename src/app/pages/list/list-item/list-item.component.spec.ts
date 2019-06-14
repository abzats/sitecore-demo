import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemComponent } from './list-item.component';
import { Component } from '@angular/core';
import { ImageModel } from '../list.service';
import { By } from '@angular/platform-browser';

@Component({
    template: `
        <app-list-item [item]="item"></app-list-item>
    `
})
class HostListItemComponent {
    item: ImageModel = {
        id:           'id',
        author:       'author',
        width:        100,
        height:       200,
        url:          'url',
        download_url: 'download_url'
    };
}

describe('ListItemComponent', () => {
    let component: ListItemComponent;
    let fixture: ComponentFixture<ListItemComponent>;

    let hostComponent: HostListItemComponent;
    let hostFixture: ComponentFixture<HostListItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ListItemComponent,
                HostListItemComponent
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        hostFixture = TestBed.createComponent(HostListItemComponent);
        hostComponent = fixture.componentInstance;
        hostFixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(hostComponent).toBeTruthy();
    });

    it('should set "item.author"', () => {
        const _component = hostFixture.debugElement.query(By.css('app-list-item')).nativeElement;
        expect(_component.textContent).toContain('author');
    });
});
