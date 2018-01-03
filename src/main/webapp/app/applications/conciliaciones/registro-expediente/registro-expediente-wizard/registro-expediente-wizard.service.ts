
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Pasegl } from './..';
import { Datlab } from '../../models/datlab.model';
import { Empleador } from '../../models/empleador.model';
import { Trabajador } from '../../models/trabajador.model';
import { Expediente } from '../../models/expediente.model';

@Injectable()
export class RegistroExpedienteWizardService {

  private messageSource = new BehaviorSubject<Pasegl>(new Pasegl());
  paseSeleccionado = this.messageSource.asObservable();

  private datlabSource = new BehaviorSubject<Datlab>(new Datlab());
  datlabSeleccionado = this.datlabSource.asObservable();

  private empleadorSource = new BehaviorSubject<Empleador>(new Empleador());
  empleadorSeleccionado = this.empleadorSource.asObservable();

  private trabajadorSource = new BehaviorSubject<Trabajador>(new Trabajador());
  trabajadorSeleccionado = this.trabajadorSource.asObservable();

  private expedienteSource = new BehaviorSubject<Expediente>(new Expediente());
  expedienteSeleccionado = this.expedienteSource.asObservable();

  constructor() { }

  cambiarPase(pasegl: Pasegl) {
    this.messageSource.next(pasegl)
  }

  cambiarDatlab(datlab: Datlab) {
    this.datlabSource.next(datlab)
  }

  cambiarEmpleador(empleador: Empleador) {
    this.empleadorSource.next(empleador)
  }

  cambiarTrabajador(trabajador: Trabajador) {
    this.trabajadorSource.next(trabajador)
  }

  cambiarExpediente(expediente: Expediente) {
    this.expedienteSource.next(expediente)
  }

}
