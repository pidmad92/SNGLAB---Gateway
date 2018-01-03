
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Pasegl } from './..';

@Injectable()
export class RegistroExpedienteWizardService {

  private messageSource = new BehaviorSubject<Pasegl>(new Pasegl());
  paseSeleccionado = this.messageSource.asObservable();

  constructor() { }

  cambiarPase(pasegl: Pasegl) {
    this.messageSource.next(pasegl)
  }
}
