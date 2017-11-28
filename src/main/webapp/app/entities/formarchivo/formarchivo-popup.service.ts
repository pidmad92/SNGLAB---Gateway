import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Formarchivo } from './formarchivo.model';
import { FormarchivoService } from './formarchivo.service';

@Injectable()
export class FormarchivoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private formarchivoService: FormarchivoService

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
                this.formarchivoService.find(id).subscribe((formarchivo) => {
                    formarchivo.tFecreg = this.datePipe
                        .transform(formarchivo.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    formarchivo.tFecupd = this.datePipe
                        .transform(formarchivo.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.formarchivoModalRef(component, formarchivo);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.formarchivoModalRef(component, new Formarchivo());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    formarchivoModalRef(component: Component, formarchivo: Formarchivo): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.formarchivo = formarchivo;
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
