import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Regimenlabo } from './regimenlabo.model';
import { RegimenlaboService } from './regimenlabo.service';

@Injectable()
export class RegimenlaboPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private regimenlaboService: RegimenlaboService

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
                this.regimenlaboService.find(id).subscribe((regimenlabo) => {
                    regimenlabo.dFechareg = this.datePipe
                        .transform(regimenlabo.dFechareg, 'yyyy-MM-ddTHH:mm:ss');
                    regimenlabo.dFechaupd = this.datePipe
                        .transform(regimenlabo.dFechaupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.regimenlaboModalRef(component, regimenlabo);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.regimenlaboModalRef(component, new Regimenlabo());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    regimenlaboModalRef(component: Component, regimenlabo: Regimenlabo): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.regimenlabo = regimenlabo;
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
