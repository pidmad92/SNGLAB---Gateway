import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UsuarioGrupoComponent } from './usuario-grupo.component';
import { UsuarioGrupoDetailComponent } from './usuario-grupo-detail.component';
import { UsuarioGrupoPopupComponent } from './usuario-grupo-dialog.component';
import { UsuarioGrupoDeletePopupComponent } from './usuario-grupo-delete-dialog.component';

@Injectable()
export class UsuarioGrupoResolvePagingParams implements Resolve<any> {

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

export const usuarioGrupoRoute: Routes = [
    {
        path: 'usuario-grupo',
        component: UsuarioGrupoComponent,
        resolve: {
            'pagingParams': UsuarioGrupoResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.usuarioGrupo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'usuario-grupo/:id',
        component: UsuarioGrupoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.usuarioGrupo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const usuarioGrupoPopupRoute: Routes = [
    {
        path: 'usuario-grupo-new',
        component: UsuarioGrupoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.usuarioGrupo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'usuario-grupo/:id/edit',
        component: UsuarioGrupoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.usuarioGrupo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'usuario-grupo/:id/delete',
        component: UsuarioGrupoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.usuarioGrupo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
