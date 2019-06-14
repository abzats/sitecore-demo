import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ListService, ImageModel } from './list.service';
import { BoolRefClass } from '../../shared/classes/bool-ref.class';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterViewInit, OnDestroy {

    loading: BoolRefClass;

    list: ImageModel[];

    page: number;

    private _limit: number;
    private _listLimit: number;

    triggeredScrollEvent: boolean;

    @ViewChild('scrollableContainer', { static: false }) scrollableContainer: ElementRef;
    @ViewChild('scrollableContent', { static: false }) scrollableContent: ElementRef;

    private scrollFn: EventListenerOrEventListenerObject;

    constructor(
        private listServise: ListService
    ) {
        this.list = [];
        this.page = 0;
        this._limit = 40;
        this._listLimit = 200;
        this.loading = BoolRefClass.True;
    }

    ngOnInit() {
        this.getData();
    }

    ngAfterViewInit() {
        this.scrollFn = (event) => this.handleScroll();

        this.scrollableContainer.nativeElement.addEventListener('scroll', this.scrollFn);
        this.scrollableContainer.nativeElement.addEventListener('resize', this.scrollFn);
    }

    ngOnDestroy(): void {
        window.removeEventListener('resize', this.scrollFn);
        window.removeEventListener('scroll', this.scrollFn);
    }

    getData() {
        this.page++;

        this.listServise
            .getList({
                    page: this.page,
                    limit: this._limit
                },
                this.loading)
            .subscribe(res => {

                this.list = [...this.list, ...res];

                if (this.list.length < 200) {
                    this.triggeredScrollEvent = false;
                }
            });

    }

    handleScroll() {
        if (!this.triggeredScrollEvent) {

            const container = this.scrollableContainer.nativeElement;
            const content = this.scrollableContent.nativeElement;

            if (container && content) {

                const offset: number = Math.max(content.offsetHeight - container.offsetHeight - container.scrollTop, 0);

                if (offset < 350) {
                    this.triggeredScrollEvent = true;
                    this.getData();
                }
            }

        }
    }
}
