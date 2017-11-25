import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { ListadoSolicitudesComponent } from './listado-solicitudes.component';
import { UserRouteAccessService } from '../../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';
import { SolicitudPopupComponent } from '../../../entities/solicitud/solicitud-dialog.component';

export const ListadoSolicitudesRoute: Routes = [
    {
        path: 'dictamenes/listado-solicitudes',
        component: ListadoSolicitudesComponent,
        children: []
    }, {
        path: 'solicitud/:id/voucher',
        component: SolicitudPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.solicitud.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
