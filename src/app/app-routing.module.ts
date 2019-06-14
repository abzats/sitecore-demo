import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './pages/list/list.component';
import { DescriptionComponent } from './pages/description/description.component';

const routes: Routes = [
    {
        path: 'list',
        component: ListComponent,
        data: {
            title: 'list_title'
        }

    },
    {
        path: 'description',
        component: DescriptionComponent,
        data: {
            title: 'description_title'
        }

    },
    {
        path: '',
        redirectTo: '/list',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '/',
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
