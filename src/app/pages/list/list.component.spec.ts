import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { ListItemComponent } from './list-item/list-item.component';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ListService } from './list.service';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('ListComponent', () => {
    let component: ListComponent;
    let fixture: ComponentFixture<ListComponent>;

    const dummyImage = {
        id:           'id',
        author:       'author',
        width:        100,
        height:       200,
        url:          'url',
        download_url: 'download_url'
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ListComponent,
                ListItemComponent,
                LoadingComponent
            ],
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                ListService
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('ngOnInit should issue getData', () => {
        const spyGetData = spyOn(component, 'getData').and.callThrough();

        component.ngOnInit();
        expect(spyGetData).toHaveBeenCalled();
    });

    it('getData should issue get request and switch paga', () => {
        expect(component.page).toEqual(1);

        component.getData();
        expect(component.page).toEqual(2);

        const spyListServise = spyOn(TestBed.get(ListService), 'getList').and.callThrough();
        component.getData();
        expect(spyListServise).toHaveBeenCalled();
    });

    it('getData should update list', () => {
        expect(component.list.length).toBe(0);

        const spyListServise = spyOn(TestBed.get(ListService), 'getList').and.callFake(() => {
            const response = [];
            for (let i = 0; i < 20; i++) {
                response.push(dummyImage);
            }
            return of(response)
        });

        component.getData();
        expect(component.list.length).toBe(20);
    });

    it('getData should toggle triggeredScrollEvent', () => {
        component.triggeredScrollEvent = true;

        let spyListServise = spyOn(TestBed.get(ListService), 'getList').and.callFake(() => {
            const response = [];
            for (let i = 0; i < 1; i++) {
                response.push(dummyImage);
            }
            return of(response)
        });

        component.getData();
        expect(component.triggeredScrollEvent).toBeFalsy();

        component.triggeredScrollEvent = true;
        spyListServise.and.callFake(() => {
            const response = [];
            for (let i = 0; i < 201; i++) {
                response.push(dummyImage);
            }
            return of(response)
        });

        component.getData();
        expect(component.triggeredScrollEvent).toBeTruthy();
    });

    it('should call handleScroll on scroll',() => {
        const spyGetData = spyOn(component, 'handleScroll').and.callThrough();

        for (let i = 0; i < 20; i++) {
            component.list.push(dummyImage);
        }


        const wrapper = fixture.debugElement.query(By.css('.list-grid__wrapper'));
        wrapper.nativeElement.scrollDown = 2000;
        wrapper.nativeElement.dispatchEvent(new Event('scroll'));

        fixture.detectChanges();

        expect(spyGetData).toHaveBeenCalled();
    });

    it('handleScroll should not call getData if triggeredScrollEvent',() => {
        component.triggeredScrollEvent = true;

        const spyGetData = spyOn(component, 'getData').and.callThrough();

        for (let i = 0; i < 20; i++) {
            component.list.push(dummyImage);
        }


        const wrapper = fixture.debugElement.query(By.css('.list-grid__wrapper'));
        wrapper.nativeElement.scrollDown = 2000;
        wrapper.nativeElement.dispatchEvent(new Event('scroll'));


        fixture.detectChanges();

        expect(spyGetData).not.toHaveBeenCalled();

        component.triggeredScrollEvent = false;
        wrapper.nativeElement.scrollDown = 2000;
        wrapper.nativeElement.dispatchEvent(new Event('scroll'));
        expect(spyGetData).toHaveBeenCalled();
    });
});
