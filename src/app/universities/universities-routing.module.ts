import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UniversitiesComponent} from './universities.component';
import {UniversitiesCreateComponent} from './universities-create/universities-create.component';
import {UniversitiesPageComponent} from './university-page/universities-page.component';

const routes: Routes = [
    {
        path: 'universities',
        component: UniversitiesComponent
    },

    {
        path: 'universities/university',
        component: UniversitiesCreateComponent
    },

    {
        path: 'universities/:id',
        component: UniversitiesPageComponent
    },

    {
        path: 'delete/:id',
        component: UniversitiesPageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UniversitiesRoutingModule {
}

