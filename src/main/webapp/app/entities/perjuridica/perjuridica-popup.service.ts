import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Perjuridica } from './perjuridica.model';
import { PerjuridicaService } from './perjuridica.service';

@Injectable()
export class PerjuridicaPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private perjuridicaService: PerjuridicaService

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
                this.perjuridicaService.find(id).subscribe((perjuridica) => {
                    perjuridica.tFecreg = this.datePipe
                        .transform(perjuridica.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    perjuridica.tFecupd = this.datePipe
                        .transform(perjuridica.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.perjuridicaModalRef(component, perjuridica);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.perjuridicaModalRef(component, new Perjuridica());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    perjuridicaModalRef(component: Component, perjuridica: Perjuridica): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.perjuridica = perjuridica;
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
