import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Liquidacion } from './liquidacion.model';
import { LiquidacionService } from './liquidacion.service';

@Injectable()
export class LiquidacionPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private liquidacionService: LiquidacionService

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
                this.liquidacionService.find(id).subscribe((liquidacion) => {
                    liquidacion.tFecreg = this.datePipe
                        .transform(liquidacion.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    liquidacion.tFecupd = this.datePipe
                        .transform(liquidacion.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.liquidacionModalRef(component, liquidacion);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.liquidacionModalRef(component, new Liquidacion());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    liquidacionModalRef(component: Component, liquidacion: Liquidacion): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.liquidacion = liquidacion;
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
