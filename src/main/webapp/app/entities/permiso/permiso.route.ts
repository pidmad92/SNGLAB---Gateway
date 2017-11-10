import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { PermisoComponent } from './permiso.component';
import { PermisoDetailComponent } from './permiso-detail.component';
import { PermisoPopupComponent } from './permiso-dialog.component';
import { PermisoDeletePopupComponent } from './permiso-delete-dialog.component';

@Injectable()
export class PermisoResolvePagingParams implements Resolve<any> {

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

export const permisoRoute: Routes = [
    {
        path: 'permiso',
        component: PermisoComponent,
        resolve: {
            'pagingParams': PermisoResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.permiso.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'permiso/:id',
        component: PermisoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.permiso.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const permisoPopupRoute: Routes = [
    {
        path: 'permiso-new',
        component: PermisoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.permiso.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'permiso/:id/edit',
        component: PermisoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.permiso.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'permiso/:id/delete',
        component: PermisoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.permiso.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
