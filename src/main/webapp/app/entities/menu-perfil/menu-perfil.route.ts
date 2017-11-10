import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { MenuPerfilComponent } from './menu-perfil.component';
import { MenuPerfilDetailComponent } from './menu-perfil-detail.component';
import { MenuPerfilPopupComponent } from './menu-perfil-dialog.component';
import { MenuPerfilDeletePopupComponent } from './menu-perfil-delete-dialog.component';

@Injectable()
export class MenuPerfilResolvePagingParams implements Resolve<any> {

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

export const menuPerfilRoute: Routes = [
    {
        path: 'menu-perfil',
        component: MenuPerfilComponent,
        resolve: {
            'pagingParams': MenuPerfilResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.menuPerfil.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'menu-perfil/:id',
        component: MenuPerfilDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.menuPerfil.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const menuPerfilPopupRoute: Routes = [
    {
        path: 'menu-perfil-new',
        component: MenuPerfilPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.menuPerfil.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'menu-perfil/:id/edit',
        component: MenuPerfilPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.menuPerfil.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'menu-perfil/:id/delete',
        component: MenuPerfilDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.menuPerfil.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
