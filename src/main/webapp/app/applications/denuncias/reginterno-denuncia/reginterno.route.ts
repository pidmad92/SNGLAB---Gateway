import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { ReginternoComponent } from './reginterno.component';
import { UserRouteAccessService } from '../../../shared';

export const ReginternoRoute: Routes = [
    {
        path: 'formreginterno',
        component: ReginternoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'global.menu.entities.registroExpediente'
        },
        canActivate: [UserRouteAccessService],
        children: [
            {
                path: 'formularioregdenuncia',
                component: ReginternoComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.entities.registroExpediente'
                },
                outlet: 'wizard'
            }
         ]
    }
];
