import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UsuPerComponent } from './usu-per.component';
import { UsuPerDetailComponent } from './usu-per-detail.component';
import { UsuPerPopupComponent } from './usu-per-dialog.component';
import { UsuPerDeletePopupComponent } from './usu-per-delete-dialog.component';

@Injectable()
export class UsuPerResolvePagingParams implements Resolve<any> {

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

export const usuPerRoute: Routes = [
    {
        path: 'usu-per',
        component: UsuPerComponent,
        resolve: {
            'pagingParams': UsuPerResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.usuPer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'usu-per/:id',
        component: UsuPerDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.usuPer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const usuPerPopupRoute: Routes = [
    {
        path: 'usu-per-new',
        component: UsuPerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.usuPer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'usu-per/:id/edit',
        component: UsuPerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.usuPer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'usu-per/:id/delete',
        component: UsuPerDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.usuPer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
