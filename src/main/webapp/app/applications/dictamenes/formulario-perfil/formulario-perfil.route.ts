import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { FormularioPerfilComponent } from './formulario-perfil.component';
import { UserRouteAccessService } from '../../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

export const FormularioPerfilRoute: Routes = [
    {
        path: 'dictamenes/formulario-perfil',
        component: FormularioPerfilComponent,
        children: []
    }
];
