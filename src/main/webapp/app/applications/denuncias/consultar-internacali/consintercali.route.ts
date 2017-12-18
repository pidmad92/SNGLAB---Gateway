import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { ConsintercaliComponent } from './consintercali.component';
import { UserRouteAccessService } from '../../../shared';

export const ConsintercaliRoute: Routes = [
    {
        path: 'formconsinternocali',
        component: ConsintercaliComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'global.menu.entities.registroExpediente'
        },
        canActivate: [UserRouteAccessService],
        children: [
            {
                path: 'formularioconstinternocali',
                component: ConsintercaliComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.entities.registroExpediente'
                },
                outlet: 'wizard'
            }
         ]
    }
];
