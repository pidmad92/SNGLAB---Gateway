import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { RegistroSolicitudesComponent } from './registro-solicitudes.component';
import { UserRouteAccessService } from '../../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

export const RegistroSolicitudesRoute: Routes = [
    {
        path: 'dictamenes/registro-solicitudes',
        component: RegistroSolicitudesComponent,
        children: []
    }
];
