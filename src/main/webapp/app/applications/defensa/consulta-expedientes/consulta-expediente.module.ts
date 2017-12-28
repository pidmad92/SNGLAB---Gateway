import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../../shared';
import {
    ConsultaExpedienteComponent,
    ConsultaExpedienteDialogComponent,
    ConsultaExpedientePopupComponent,
    ConsultaExpedientePopupService,
    ConsultaExpedienteArchivarDialogComponent,
    ConsultaExpedienteArchivarPopupComponent,
    ConsultaExpedienteArchivarPopupService,
    ConsultaExpedienteObservarDialogComponent,
    ConsultaExpedienteObservarPopupComponent,
    ConsultaExpedienteObservarPopupService,
    consultaExpedienteRoute } from './';

    import { AccionExpedienteComponent } from './accion-expedientes/accion-expediente.component';
    import { AccionExpedienteDialogComponent } from './accion-expedientes/accion-expediente-dialog.component';
    import { AccionExpedientePopupComponent} from './accion-expedientes/accion-expediente-dialog.component';
    import { AccionExpedientePopupService } from './accion-expedientes/accion-expediente-popup.service';
    import { AccionExpedienteArchivarDialogComponent } from './accion-expedientes/accion-expediente-archivar-dialog.component';
    import { AccionExpedienteArchivarPopupComponent } from './accion-expedientes/accion-expediente-archivar-dialog.component';
    import { AccionExpedienteArchivarPopupService } from './accion-expedientes/accion-expediente-archivar-popup.service';
    import { AccionExpedienteObservarDialogComponent } from './accion-expedientes/accion-expediente-observar-dialog.component';
    import { AccionExpedienteObservarPopupComponent } from './accion-expedientes/accion-expediente-observar-dialog.component';
    import { AccionExpedienteObservarPopupService} from './accion-expedientes/accion-expediente-observar-popup.service';

import { TabViewModule, DataTableModule, CheckboxModule, DropdownModule, CalendarModule } from 'primeng/primeng';

const ENTITY_STATES = [
    ...consultaExpedienteRoute
];

@NgModule({
    imports: [
        GatewaySharedModule,
        TabViewModule,
        DataTableModule,
        CheckboxModule,
        DropdownModule,
        CalendarModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ConsultaExpedienteComponent,
        ConsultaExpedientePopupComponent,
        ConsultaExpedienteDialogComponent,
        ConsultaExpedienteArchivarDialogComponent,
        ConsultaExpedienteArchivarPopupComponent,
        ConsultaExpedienteObservarDialogComponent,
        ConsultaExpedienteObservarPopupComponent,
        AccionExpedienteComponent,
        AccionExpedientePopupComponent,
        AccionExpedienteDialogComponent,
        AccionExpedienteArchivarDialogComponent,
        AccionExpedienteArchivarPopupComponent,
        AccionExpedienteObservarDialogComponent,
        AccionExpedienteObservarPopupComponent

    ],
    entryComponents: [
        ConsultaExpedienteComponent,
        ConsultaExpedientePopupComponent,
        ConsultaExpedienteDialogComponent,
        ConsultaExpedienteArchivarDialogComponent,
        ConsultaExpedienteArchivarPopupComponent,
        ConsultaExpedienteObservarDialogComponent,
        ConsultaExpedienteObservarPopupComponent,
        AccionExpedienteComponent,
        AccionExpedientePopupComponent,
        AccionExpedienteDialogComponent,
        AccionExpedienteArchivarDialogComponent,
        AccionExpedienteArchivarPopupComponent,
        AccionExpedienteObservarDialogComponent,
        AccionExpedienteObservarPopupComponent
    ],
    providers: [
        ConsultaExpedientePopupService,
        ConsultaExpedienteArchivarPopupService,
        ConsultaExpedienteObservarPopupService,
        AccionExpedientePopupService,
        AccionExpedienteArchivarPopupService,
        AccionExpedienteObservarPopupService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConsultaExpedienteModule {}
