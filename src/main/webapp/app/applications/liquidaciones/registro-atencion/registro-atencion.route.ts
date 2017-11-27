import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { RegistroAtencionComponent } from './registro-atencion.component';

import { UserRouteAccessService } from '../../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

export const RegistroAtencionRoute: Routes = [
    {
        path: 'registro-atencion',
        component: RegistroAtencionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'global.menu.entities.registroExpediente'
        },
        canActivate: [UserRouteAccessService],
        children: [
            {
                path: 'registro-atencion',
                component: RegistroAtencionComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.entities.registroExpediente'
                },
                outlet: 'wizard'
            }
        ]
    }
];
