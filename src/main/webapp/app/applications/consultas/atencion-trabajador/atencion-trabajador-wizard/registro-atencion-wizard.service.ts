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
import { Sucesor } from '../../models/sucesor.model';

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

  private motateSelSource = new BehaviorSubject<Motateselec []>([]);
  motateSeleccionado = this.motateSelSource.asObservable();

  private docingSelSource = new BehaviorSubject<Docinperdlb []>([]);
  docingSeleccionado = this.docingSelSource.asObservable();

  private docpresSelSource = new BehaviorSubject<Docpresate []>([]);
  docpresSeleccionado = this.docpresSelSource.asObservable();

  private accionaSelSource = new BehaviorSubject<Accadoate []>([]);
  accionaSeleccionado = this.accionaSelSource.asObservable();

  private paganteriorSource = new BehaviorSubject(null);
  paganteriorSelec = this.paganteriorSource.asObservable();

  private sucesorSource = new BehaviorSubject<Sucesor>(new Sucesor());
  sucesorSeleccionado = this.sucesorSource.asObservable();

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

  cambiarBandPagAnterior(pagante: string) {
    this.paganteriorSource.next(pagante);
  }

  cambiarSucesor(sucesor: Sucesor) {
    this.sucesorSource.next(sucesor)
  }

}
