import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { GrupoComponent } from './grupo.component';
import { GrupoDetailComponent } from './grupo-detail.component';
import { GrupoPopupComponent } from './grupo-dialog.component';
import { GrupoDeletePopupComponent } from './grupo-delete-dialog.component';

@Injectable()
export class GrupoResolvePagingParams implements Resolve<any> {

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

export const grupoRoute: Routes = [
    {
        path: 'grupo',
        component: GrupoComponent,
        resolve: {
            'pagingParams': GrupoResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.grupo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'grupo/:id',
        component: GrupoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.grupo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const grupoPopupRoute: Routes = [
    {
        path: 'grupo-new',
        component: GrupoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.grupo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'grupo/:id/edit',
        component: GrupoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.grupo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'grupo/:id/delete',
        component: GrupoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.grupo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
