import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ModuloComponent } from './modulo.component';
import { ModuloDetailComponent } from './modulo-detail.component';
import { ModuloPopupComponent } from './modulo-dialog.component';
import { ModuloDeletePopupComponent } from './modulo-delete-dialog.component';

@Injectable()
export class ModuloResolvePagingParams implements Resolve<any> {

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

export const moduloRoute: Routes = [
    {
        path: 'modulo',
        component: ModuloComponent,
        resolve: {
            'pagingParams': ModuloResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.modulo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'modulo/:id',
        component: ModuloDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.modulo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const moduloPopupRoute: Routes = [
    {
        path: 'modulo-new',
        component: ModuloPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.modulo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'modulo/:id/edit',
        component: ModuloPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.modulo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'modulo/:id/delete',
        component: ModuloDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.modulo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
