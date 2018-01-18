

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Legajo } from './../../models/legajo.model';
// import { Datlab } from '../../models/datlab.model';
// import { Empleador } from '../../models/empleador.model';
// import { Trabajador } from '../../models/trabajador.model';
// import { Expediente } from '../../models/expediente.model';
// import { Concilia } from '../../models/concilia.model';

@Injectable()
export class RegistroExpedienteWizardService {

  private legajoSource = new BehaviorSubject<Legajo>(new Legajo());
  legajoSeleccionado = this.legajoSource.asObservable();

  // private datlabSource = new BehaviorSubject<Datlab>(new Datlab());
  // datlabSeleccionado = this.datlabSource.asObservable();

  // private empleadorSource = new BehaviorSubject<Empleador>(new Empleador());
  // empleadorSeleccionado = this.empleadorSource.asObservable();

  // private trabajadorSource = new BehaviorSubject<Trabajador>(new Trabajador());
  // trabajadorSeleccionado = this.trabajadorSource.asObservable();

  // private expedienteSource = new BehaviorSubject<Expediente>(new Expediente());
  // expedienteSeleccionado = this.expedienteSource.asObservable();

  // private conciliaSource = new BehaviorSubject<Concilia>(new Concilia());
  // conciliaSeleccionado = this.conciliaSource.asObservable();

  constructor() { }

  cambiarLegajo(legajo: Legajo) {
    this.legajoSource.next(legajo)
  }

  // cambiarDatlab(datlab: Datlab) {
  //   this.datlabSource.next(datlab)
  // }

  // cambiarEmpleador(empleador: Empleador) {
  //   this.empleadorSource.next(empleador)
  // }

  // cambiarTrabajador(trabajador: Trabajador) {
  //   this.trabajadorSource.next(trabajador)
  // }

  // cambiarExpediente(expediente: Expediente) {
  //   this.expedienteSource.next(expediente)
  // }

  // cambiarConcilia(concilia: Concilia) {
  //   this.conciliaSource.next(concilia)
  // }

}
