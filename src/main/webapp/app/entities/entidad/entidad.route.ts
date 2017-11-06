import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { EntidadComponent } from './entidad.component';
import { EntidadDetailComponent } from './entidad-detail.component';
import { EntidadPopupComponent } from './entidad-dialog.component';
import { EntidadDeletePopupComponent } from './entidad-delete-dialog.component';

@Injectable()
export class EntidadResolvePagingParams implements Resolve<any> {

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

export const entidadRoute: Routes = [
    {
        path: 'entidad',
        component: EntidadComponent,
        resolve: {
            'pagingParams': EntidadResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.entidad.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'entidad/:id',
        component: EntidadDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.entidad.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const entidadPopupRoute: Routes = [
    {
        path: 'entidad-new',
        component: EntidadPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.entidad.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'entidad/:id/edit',
        component: EntidadPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.entidad.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'entidad/:id/delete',
        component: EntidadDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.entidad.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
