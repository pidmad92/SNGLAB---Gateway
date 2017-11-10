import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Expediente } from './expediente.model';
import { ExpedienteService } from './expediente.service';

@Injectable()
export class ExpedientePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private expedienteService: ExpedienteService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.expedienteService.find(id).subscribe((expediente) => {
                    expediente.dFecregexp = this.datePipe
                        .transform(expediente.dFecregexp, 'yyyy-MM-ddTHH:mm:ss');
                    expediente.dFecmesapartes = this.datePipe
                        .transform(expediente.dFecmesapartes, 'yyyy-MM-ddTHH:mm:ss');
                    expediente.dFecArchivo = this.datePipe
                        .transform(expediente.dFecArchivo, 'yyyy-MM-ddTHH:mm:ss');
                    expediente.dFechareg = this.datePipe
                        .transform(expediente.dFechareg, 'yyyy-MM-ddTHH:mm:ss');
                    expediente.dFechaupd = this.datePipe
                        .transform(expediente.dFechaupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.expedienteModalRef(component, expediente);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.expedienteModalRef(component, new Expediente());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    expedienteModalRef(component: Component, expediente: Expediente): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.expediente = expediente;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
