import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { TipoUsuarioComponent } from './tipo-usuario.component';
import { TipoUsuarioDetailComponent } from './tipo-usuario-detail.component';
import { TipoUsuarioPopupComponent } from './tipo-usuario-dialog.component';
import { TipoUsuarioDeletePopupComponent } from './tipo-usuario-delete-dialog.component';

@Injectable()
export class TipoUsuarioResolvePagingParams implements Resolve<any> {

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

export const tipoUsuarioRoute: Routes = [
    {
        path: 'tipo-usuario',
        component: TipoUsuarioComponent,
        resolve: {
            'pagingParams': TipoUsuarioResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipoUsuario.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tipo-usuario/:id',
        component: TipoUsuarioDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipoUsuario.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tipoUsuarioPopupRoute: Routes = [
    {
        path: 'tipo-usuario-new',
        component: TipoUsuarioPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipoUsuario.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipo-usuario/:id/edit',
        component: TipoUsuarioPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipoUsuario.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipo-usuario/:id/delete',
        component: TipoUsuarioDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipoUsuario.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
