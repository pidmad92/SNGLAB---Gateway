import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Oficina } from './oficina.model';
import { OficinaService } from './oficina.service';

@Injectable()
export class OficinaPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private oficinaService: OficinaService

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
                this.oficinaService.find(id).subscribe((oficina) => {
                    oficina.tFecreg = this.datePipe
                        .transform(oficina.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    oficina.tFecupd = this.datePipe
                        .transform(oficina.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.oficinaModalRef(component, oficina);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.oficinaModalRef(component, new Oficina());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    oficinaModalRef(component: Component, oficina: Oficina): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.oficina = oficina;
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
