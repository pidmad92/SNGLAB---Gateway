import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Delegado } from './delegado.model';
import { DelegadoService } from './delegado.service';

@Injectable()
export class DelegadoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private delegadoService: DelegadoService

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
                this.delegadoService.find(id).subscribe((delegado) => {
                    delegado.tFecinicio = this.datePipe
                        .transform(delegado.tFecinicio, 'yyyy-MM-ddTHH:mm:ss');
                    delegado.tFecrfinal = this.datePipe
                        .transform(delegado.tFecrfinal, 'yyyy-MM-ddTHH:mm:ss');
                    delegado.tFecreg = this.datePipe
                        .transform(delegado.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    delegado.tFecupd = this.datePipe
                        .transform(delegado.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.delegadoModalRef(component, delegado);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.delegadoModalRef(component, new Delegado());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    delegadoModalRef(component: Component, delegado: Delegado): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.delegado = delegado;
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
