import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { RegistroLegajoComponent } from './legajo-registro.component';

import { UserRouteAccessService } from '../../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

export const registroLegajoRoute: Routes = [
    {
        path: 'legajo-registro',
        component: RegistroLegajoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'global.menu.entities.registroLegajo'
        },
        canActivate: [UserRouteAccessService],
        children: [
            {
                path: 'legajo-registro',
                component: RegistroLegajoComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.entities.registroLegajo'
                },
                outlet: 'wizard'
            }
        ]
    }
];
