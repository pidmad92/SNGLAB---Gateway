import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { AplicacionComponent } from './aplicacion.component';
import { AplicacionDetailComponent } from './aplicacion-detail.component';
import { AplicacionPopupComponent } from './aplicacion-dialog.component';
import { AplicacionDeletePopupComponent } from './aplicacion-delete-dialog.component';

@Injectable()
export class AplicacionResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const aplicacionRoute: Routes = [
    {
        path: 'aplicacion',
        component: AplicacionComponent,
        resolve: {
            'pagingParams': AplicacionResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.aplicacion.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'aplicacion/:id',
        component: AplicacionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.aplicacion.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const aplicacionPopupRoute: Routes = [
    {
        path: 'aplicacion-new',
        component: AplicacionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.aplicacion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'aplicacion/:id/edit',
        component: AplicacionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.aplicacion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'aplicacion/:id/delete',
        component: AplicacionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.aplicacion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
