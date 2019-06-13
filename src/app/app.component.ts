import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router, NavigationEnd, Event } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'sitecore-demo';

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private titleService: Title,
        private translate: TranslateService,
    ) {
        // this language will be used as a fallback when a translation isn't found in the current language
        translate.addLangs(['en', 'ru']);
        translate.setDefaultLang('en');
    }

    ngOnInit(): void {

        this.router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd)
            )
            .pipe(
                map(() => this.activatedRoute)
            )
            .pipe(
                map((route) => {
                    while (route.firstChild) {
                        route = route.firstChild;
                    }

                    return route;
                })
            )
            .pipe(
                mergeMap((route) => route.data)
            )
            .subscribe((event) => {

                this._setPageTile(event);
            });
    }

    private _setPageTile(event) {

        this.translate.get(event['title'])
            .subscribe((title) => {

                this.titleService.setTitle(title);
            }
        );
    }
}
