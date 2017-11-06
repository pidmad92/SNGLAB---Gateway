import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { TipoEntidadComponent } from './tipo-entidad.component';
import { TipoEntidadDetailComponent } from './tipo-entidad-detail.component';
import { TipoEntidadPopupComponent } from './tipo-entidad-dialog.component';
import { TipoEntidadDeletePopupComponent } from './tipo-entidad-delete-dialog.component';

@Injectable()
export class TipoEntidadResolvePagingParams implements Resolve<any> {

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

export const tipoEntidadRoute: Routes = [
    {
        path: 'tipo-entidad',
        component: TipoEntidadComponent,
        resolve: {
            'pagingParams': TipoEntidadResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipoEntidad.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tipo-entidad/:id',
        component: TipoEntidadDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipoEntidad.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tipoEntidadPopupRoute: Routes = [
    {
        path: 'tipo-entidad-new',
        component: TipoEntidadPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipoEntidad.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipo-entidad/:id/edit',
        component: TipoEntidadPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipoEntidad.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipo-entidad/:id/delete',
        component: TipoEntidadDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipoEntidad.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
