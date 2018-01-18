import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Datlab } from '../../models/datlab.model';

@Injectable()
export class TrabajadorTransferService {

  private datlabSource = new BehaviorSubject<Datlab>(new Datlab());
  datlabSeleccionado = this.datlabSource.asObservable();

  constructor() { }

  cambiarDatlab(datlab: Datlab) {
    this.datlabSource.next(datlab)
  }

}
