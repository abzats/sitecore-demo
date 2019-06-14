import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './pages/list/list.component';
import { DescriptionComponent } from './pages/description/description.component';

const routes: Routes = [
    {
        path: 'list',
        component: ListComponent

    },
    {
        path: 'description',
        component: DescriptionComponent

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
