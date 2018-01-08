import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { TrabajadorComponent } from './trabajador/trabajador.component';

export const ConsultasRoute: Routes = [
    {
        path: 'consultas',
        data: {
            authorities: ['ROLE_USER'],
        },
        canActivate: [UserRouteAccessService],
        children: [
          {
            path: '**',
            pathMatch: 'full',
            redirectTo: 'trabajador',
            data: {
              authorities: ['ROLE_USER'],
              pageTitle: 'global.menu.entities.atencionTra'
            },
            canActivate: [UserRouteAccessService]
          },
            {
                path: 'trabajador',
                component: TrabajadorComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'global.menu.entities.atencionTra'
                },
                canActivate: [UserRouteAccessService]
            }
        ]
    }
];
