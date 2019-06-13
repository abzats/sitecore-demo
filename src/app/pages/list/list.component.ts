import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ListService, ImageInterface } from './list.service';
import { BoolRef } from '../../shared/classes/bool-ref';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterViewInit, OnDestroy {

    loading: BoolRef;

    list: ImageInterface[];

    page: number;
    private _limit: number;


    private scrollElement: HTMLElement;
    private triggeredScrollEvent: boolean;

    @ViewChild('scrollableContainer', { static: false }) scrollableContainer: ElementRef;
    @ViewChild('scrollableContent', { static: false }) scrollableContent: ElementRef;

    private containerSize: number;
    private innerContentHeight: number;

    private scrollFn: EventListenerOrEventListenerObject;
    private resizeFn: EventListenerOrEventListenerObject;

    constructor(
        private listServise: ListService
    ) {
        this.list = [];
        this.page = 0;
        this._limit = 20;
        this.loading = BoolRef.True;
    }

    ngOnInit() {

        this._getData();
    }

    ngAfterViewInit() {
        this.scrollFn = (event) => this._handleScroll();

        // this.scrollElement = this.scrollableContainer.nativeElement;

        window.addEventListener('scroll', this.scrollFn);
    }

    ngOnDestroy(): void {
        if (this.scrollElement) {
            this.scrollElement.removeEventListener('resize', this.scrollFn);
            this.scrollElement.removeEventListener('scroll', this.scrollFn);
        }

        window.removeEventListener('resize', this.resizeFn);
        window.removeEventListener('scroll', this.scrollFn);
    }

    private _handleScroll() {
        console.log('scroll');
        // this._getData();


        // this.scrollElement = this.scrollableContainer.nativeElement;

        if (!this.triggeredScrollEvent) {

            /*let offset: number;

            offset = this.scrollElement.scrollTop;

            const distanceFromBottom: number = Math.max(this.innerContentHeight - (offset + this.containerSize), 0);

            // TODO parameterize distance from bottom
            if (distanceFromBottom < 100) {
                this._getData();
            }*/

        }
    }

    private _getData() {
        this.page++;

        this.listServise
            .getList(
                {
                    page: this.page,
                    limit: this._limit
                },
                this.loading
            )
            .subscribe(res => {
                this.list = [...this.list, ...res];
                this.triggeredScrollEvent = true;
                this._handleScroll();
            });

    }

}
