import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { CalifiComponent } from './califi.component';
import { UserRouteAccessService } from '../../../shared';

export const CalifiRoute: Routes = [
    {
        path: 'calififormregdenuncia',
        component: CalifiComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'global.menu.entities.registroExpediente'
        },
        canActivate: [UserRouteAccessService],
        children: [
            {
                path: 'formularioregdenuncia',
                component: CalifiComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.entities.registroExpediente'
                },
                outlet: 'wizard'
            }
         ]
    }
];
