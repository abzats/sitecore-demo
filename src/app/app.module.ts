import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopMenuComponent } from './layout/top-menu/top-menu.component';
import { PageComponent } from './layout/page/page.component';
import { ListComponent } from './pages/list/list.component';
import { HttpClientModule } from '@angular/common/http';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { DescriptionComponent } from './pages/description/description.component';
import { ListItemComponent } from './pages/list/list-item/list-item.component';


@NgModule({
    declarations: [
        AppComponent,
        TopMenuComponent,
        PageComponent,
        ListComponent,
        LoadingComponent,
        DescriptionComponent,
        ListItemComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
