import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UsuarioHorarioComponent } from './usuario-horario.component';
import { UsuarioHorarioDetailComponent } from './usuario-horario-detail.component';
import { UsuarioHorarioPopupComponent } from './usuario-horario-dialog.component';
import { UsuarioHorarioDeletePopupComponent } from './usuario-horario-delete-dialog.component';

@Injectable()
export class UsuarioHorarioResolvePagingParams implements Resolve<any> {

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

export const usuarioHorarioRoute: Routes = [
    {
        path: 'usuario-horario',
        component: UsuarioHorarioComponent,
        resolve: {
            'pagingParams': UsuarioHorarioResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.usuarioHorario.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'usuario-horario/:id',
        component: UsuarioHorarioDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.usuarioHorario.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const usuarioHorarioPopupRoute: Routes = [
    {
        path: 'usuario-horario-new',
        component: UsuarioHorarioPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.usuarioHorario.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'usuario-horario/:id/edit',
        component: UsuarioHorarioPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.usuarioHorario.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'usuario-horario/:id/delete',
        component: UsuarioHorarioDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.usuarioHorario.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
