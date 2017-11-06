import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ModuloEntidadComponent } from './modulo-entidad.component';
import { ModuloEntidadDetailComponent } from './modulo-entidad-detail.component';
import { ModuloEntidadPopupComponent } from './modulo-entidad-dialog.component';
import { ModuloEntidadDeletePopupComponent } from './modulo-entidad-delete-dialog.component';

@Injectable()
export class ModuloEntidadResolvePagingParams implements Resolve<any> {

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

export const moduloEntidadRoute: Routes = [
    {
        path: 'modulo-entidad',
        component: ModuloEntidadComponent,
        resolve: {
            'pagingParams': ModuloEntidadResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.moduloEntidad.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'modulo-entidad/:id',
        component: ModuloEntidadDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.moduloEntidad.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const moduloEntidadPopupRoute: Routes = [
    {
        path: 'modulo-entidad-new',
        component: ModuloEntidadPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.moduloEntidad.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'modulo-entidad/:id/edit',
        component: ModuloEntidadPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.moduloEntidad.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'modulo-entidad/:id/delete',
        component: ModuloEntidadDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.moduloEntidad.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
