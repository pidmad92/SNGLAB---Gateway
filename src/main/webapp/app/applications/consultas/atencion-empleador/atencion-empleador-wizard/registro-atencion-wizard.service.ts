
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Atencion } from '../../models/atencion.model';
import { Motateselec } from '../../models/motateselec.model';
import { Docinperdlb } from '../../models/docinperdlb.model';
import { Accionadop } from '../../models/accionadop.model';

@Injectable()
export class RegistroAtencionWizardService {

  private actividadSource = new BehaviorSubject(null);
  actividadSelec = this.actividadSource.asObservable();

  private messageSource = new BehaviorSubject<Atencion>(new Atencion());
  atenSeleccionado = this.messageSource.asObservable();

  private motateSelSource = new BehaviorSubject<Motateselec []>([]);
  motateSeleccionado = this.motateSelSource.asObservable();

  private docingSelSource = new BehaviorSubject<Docinperdlb []>([]);
  docingSeleccionado = this.docingSelSource.asObservable();

  constructor() { }

  cambiarActividad(actividad: string) {
    this.actividadSource.next(actividad)
  }

  cambiarAtencion(atencion: Atencion) {
    this.messageSource.next(atencion)
  }

  cambiarMotivos(motateselec: Motateselec[]) {
    this.motateSelSource.next(motateselec)
  }

  cambiarDocumentosIng(documentosIng: Docinperdlb[]) {
    this.docingSelSource.next(documentosIng);
  }

}
