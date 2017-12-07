import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { ReporteLegajoComponent } from './reportes-legajo.component';

import { UserRouteAccessService } from '../../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

export const ReporteLegajoRoute: Routes = [
    {
        path: 'reporte/legajo',
        component: ReporteLegajoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'global.menu.entities.ReporteLegajo'
        },
        canActivate: [UserRouteAccessService],
        children: [
        ]
    }
];
