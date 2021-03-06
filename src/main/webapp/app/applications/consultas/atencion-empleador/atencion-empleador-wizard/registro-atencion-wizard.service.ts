import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Atencion } from '../../models/atencion.model';
import { Datlab } from '../../models/datlab.model';
import { Empleador } from '../../models/empleador.model';
import { Trabajador } from '../../models/trabajador.model';
import { Motateselec } from '../../models/motateselec.model';
import { Docinperdlb } from '../../models/docinperdlb.model';
import { Docpresate } from '../../models/docpresate.model';
import { Accadoate } from '../../models/accadoate.model';

@Injectable()
export class RegistroAtencionWizardService {

  private actividadSource = new BehaviorSubject(null);
  actividadSelec = this.actividadSource.asObservable();

  private messageSource = new BehaviorSubject<Atencion>(new Atencion());
  atenSeleccionado = this.messageSource.asObservable();

  private datlabSource = new BehaviorSubject<Datlab>(new Datlab());
  datlabSeleccionado = this.datlabSource.asObservable();

  private empleadorSource = new BehaviorSubject<Empleador>(new Empleador());
  empleadorSeleccionado = this.empleadorSource.asObservable();

  private trabajadorSource = new BehaviorSubject<Trabajador>(new Trabajador());
  trabajadorSeleccionado = this.trabajadorSource.asObservable();

  private representanteSource = new BehaviorSubject<Trabajador>(new Trabajador());
  representanteSeleccionado = this.representanteSource.asObservable();

  private motateSelSource = new BehaviorSubject<Motateselec []>([]);
  motateSeleccionado = this.motateSelSource.asObservable();

  private docingSelSource = new BehaviorSubject<Docinperdlb []>([]);
  docingSeleccionado = this.docingSelSource.asObservable();

  private docpresSelSource = new BehaviorSubject<Docpresate []>([]);
  docpresSeleccionado = this.docpresSelSource.asObservable();

  private accionaSelSource = new BehaviorSubject<Accadoate []>([]);
  accionaSeleccionado = this.accionaSelSource.asObservable();

  constructor() { }

  cambiarActividad(actividad: string) {
    this.actividadSource.next(actividad)
  }

  cambiarAtencion(atencion: Atencion) {
    this.messageSource.next(atencion)
  }

  cambiarEmpleador(empleador: Empleador) {
    this.empleadorSource.next(empleador)
  }

  cambiarTrabajador(trabajador: Trabajador) {
    this.trabajadorSource.next(trabajador)
  }

  cambiarRepresentante(trabajador: Trabajador) {
    this.representanteSource.next(trabajador)
  }

  cambiarDatlab(datlab: Datlab) {
    this.datlabSource.next(datlab)
  }

  cambiarMotivos(motateselec: Motateselec[]) {
    this.motateSelSource.next(motateselec)
  }

  cambiarDocumentosIng(documentosIng: Docinperdlb[]) {
    this.docingSelSource.next(documentosIng);
  }

  cambiarDocumentosPres(documentosPres: Docpresate[]) {
    this.docpresSelSource.next(documentosPres);
  }

  cambiarAccionadop(accionadop: Accadoate[]) {
    this.accionaSelSource.next(accionadop);
  }
}
