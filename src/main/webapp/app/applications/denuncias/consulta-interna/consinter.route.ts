import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { ConsinterComponent } from './consinter.component';
import { UserRouteAccessService } from '../../../shared';

export const ConsinterRoute: Routes = [
    {
        path: 'formconsinterno',
        component: ConsinterComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'global.menu.entities.registroExpediente'
        },
        canActivate: [UserRouteAccessService],
        children: [
            {
                path: 'formularioconstinterno',
                component: ConsinterComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.entities.registroExpediente'
                },
                outlet: 'wizard'
            }
         ]
    }
];
