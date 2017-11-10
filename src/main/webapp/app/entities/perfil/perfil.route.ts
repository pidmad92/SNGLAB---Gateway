import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { PerfilComponent } from './perfil.component';
import { PerfilDetailComponent } from './perfil-detail.component';
import { PerfilPopupComponent } from './perfil-dialog.component';
import { PerfilDeletePopupComponent } from './perfil-delete-dialog.component';

@Injectable()
export class PerfilResolvePagingParams implements Resolve<any> {

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

export const perfilRoute: Routes = [
    {
        path: 'perfil',
        component: PerfilComponent,
        resolve: {
            'pagingParams': PerfilResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.perfil.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'perfil/:id',
        component: PerfilDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.perfil.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const perfilPopupRoute: Routes = [
    {
        path: 'perfil-new',
        component: PerfilPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.perfil.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'perfil/:id/edit',
        component: PerfilPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.perfil.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'perfil/:id/delete',
        component: PerfilDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.perfil.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
