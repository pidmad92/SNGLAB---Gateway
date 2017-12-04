import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { FormularioregdenunciaComponent } from './formulario-regdenuncia.component';

import { UserRouteAccessService } from '../../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

// import { RevisarSolicitudesComponent } from './revisar-solicitudes.component';
// import { AccionadopDetailComponent } from './accionadop-detail.component';
// import { AccionadopPopupComponent } from './accionadop-dialog.component';
// import { AccionadopDeletePopupComponent } from './accionadop-delete-dialog.component';

export const FormularioregdenunciaRoute: Routes = [
    {
        path: 'formularioregdenuncia',
        component: FormularioregdenunciaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'global.menu.entities.registroExpediente'
        },
        canActivate: [UserRouteAccessService],
        children: [
            {
                path: 'formularioregdenuncia',
                component: FormularioregdenunciaComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.entities.registroExpediente'
                },
                outlet: 'wizard'
            }
         ]
    }
];
