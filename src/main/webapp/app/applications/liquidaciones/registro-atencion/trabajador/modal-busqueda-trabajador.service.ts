import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../../../shared';

import { DatePipe } from '@angular/common';

import { TrabajadorService } from './tabajador.service';

import { Datlab } from './../../models/datlab.model';

@Injectable()
export class ModalBusquedaTrabajadorService {
    private ngbModalRef: NgbModalRef;

    listaDatlab: any[] = [];

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private trabajadorService: TrabajadorService,
    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }
            console.log(`Buscando vinculos laborales registrados...`);
            if (id) {
              console.log('Id del trabajador: ' + id);
              this.trabajadorService.findDatlabsByIdTrabajador(Number(id)).subscribe((res: ResponseWrapper) => {
                this.listaDatlab = res.json;
                this.ngbModalRef = this.modalBusquedaModalRef(component, this.listaDatlab);
                resolve(this.ngbModalRef);
                // this.listaDatlab[0].tFecreg = this.datePipe.transform(this.listaDatlab[0].tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                console.log(`¡Vinculos Laborales encontrados! Total de registros: ${this.listaDatlab.length}`);
                // console.log(this.listaDatlab);
              });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.modalBusquedaModalRef(component, null);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    modalBusquedaModalRef(component: Component, listaDatlab: any[]): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.listaDatlab = listaDatlab;
        modalRef.result.then((result) => {
            this.router.navigate(['liquidaciones/registro-atencion/trabajador'], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate(['liquidaciones/registro-atencion/trabajador'], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
