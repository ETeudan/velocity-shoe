import { ProductListComponent } from './product-list/product-list.component';
import { Routes } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';
import { LoginComponent } from './login/login.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CanDeactivateGuard } from './shared/can-deactivate.guard';
import { NotFoundComponent } from './404-not-found/NotFound.component';

export const appRoutes: Routes = [
    {
        path: 'products', component: MainNavComponent, canActivate: [AuthGuard],
        children: [
            { path: '', component: ProductListComponent, outlet: 'content' }
        ]
    },
    {
        path: 'products/:uuid', component: MainNavComponent, canActivate: [AuthGuard],
        children: [
            { path: '', component: ProductDetailsComponent, canDeactivate: [CanDeactivateGuard], outlet: 'content' }
        ]
    },
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/products', pathMatch: 'full' },
    { path: '404', component: NotFoundComponent },
    { path: '**', redirectTo: '/404' }

];
