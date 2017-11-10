import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Multa } from './multa.model';
import { MultaService } from './multa.service';

@Injectable()
export class MultaPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private multaService: MultaService

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
                this.multaService.find(id).subscribe((multa) => {
                    multa.dFecresolucionsd = this.datePipe
                        .transform(multa.dFecresolucionsd, 'yyyy-MM-ddTHH:mm:ss');
                    multa.dFechareg = this.datePipe
                        .transform(multa.dFechareg, 'yyyy-MM-ddTHH:mm:ss');
                    multa.dFechaupd = this.datePipe
                        .transform(multa.dFechaupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.multaModalRef(component, multa);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.multaModalRef(component, new Multa());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    multaModalRef(component: Component, multa: Multa): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.multa = multa;
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
