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

    import { ExpedienteEmitidoComponent } from './expedientes/expediente-emitido.component';
    import { ExpedienteMultadoComponent } from './expedientes/expediente-multado.component';
    import { ExpedienteParaMultarComponent } from './expedientes/expediente-paramultar.component';

    import {
        DocumentoAsignacionPopupComponent,
        DocumentoAsignacionDialogComponent } from './expedientes/documento-asignacion-dialog.component';
    import { DocumentoAsignacionPopupService } from './expedientes/documento-asignacion-popup.service';

    import {
        MultaConsultaPopupComponent,
        MultaConsultaDialogComponent } from './expedientes/multa-consulta-dialog.component';
    import { MultaConsultaPopupService } from './expedientes/multa-consulta-popup.service';

    import {
        ResolucionSubdirectoralPopupComponent,
        ResolucionSubdirectoralDialogComponent } from './expedientes/resolucion-subdirectoral-dialog.component';
    import { ResolucionSubdirectoralPopupService } from './expedientes/resolucion-subdirectoral-popup.service';

    import { ConciliaService } from './../audiencias/concilia.service';
    import { TipdocexpService } from './tipdocexp.service';
    import { DocexpedienService } from './../consulta-expedientes/docexpedien.service';

import { TabViewModule, DataTableModule, CheckboxModule, DropdownModule, CalendarModule, RadioButtonModule, MessagesModule, MessageModule } from 'primeng/primeng';

const ENTITY_STATES = [
    ...consultaExpedienteRoute
];

@NgModule({
    imports: [
        GatewaySharedModule,
        TabViewModule,
        MessageModule,
        MessagesModule,
        DataTableModule,
        CheckboxModule,
        DropdownModule,
        CalendarModule,
        RadioButtonModule,
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
        AccionExpedienteObservarPopupComponent,
        ExpedienteEmitidoComponent,
        ExpedienteMultadoComponent,
        ExpedienteParaMultarComponent,
        DocumentoAsignacionPopupComponent,
        DocumentoAsignacionDialogComponent,
        MultaConsultaPopupComponent,
        MultaConsultaDialogComponent,
        ResolucionSubdirectoralPopupComponent,
        ResolucionSubdirectoralDialogComponent
       // AudienciaConsultaPopupComponent

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
        AccionExpedienteObservarPopupComponent,
        ExpedienteEmitidoComponent,
        ExpedienteMultadoComponent,
        ExpedienteParaMultarComponent,
        DocumentoAsignacionPopupComponent,
        DocumentoAsignacionDialogComponent,
        MultaConsultaPopupComponent,
        MultaConsultaDialogComponent,
        ResolucionSubdirectoralPopupComponent,
        ResolucionSubdirectoralDialogComponent
        // AudienciaConsultaPopupComponent
    ],
    providers: [
        ConsultaExpedientePopupService,
        ConsultaExpedienteArchivarPopupService,
        ConsultaExpedienteObservarPopupService,
        AccionExpedientePopupService,
        AccionExpedienteArchivarPopupService,
        AccionExpedienteObservarPopupService,
        DocumentoAsignacionPopupService,
        ConciliaService,
        TipdocexpService,
        DocexpedienService,
        MultaConsultaPopupService,
        ResolucionSubdirectoralPopupService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConsultaExpedienteModule {}
