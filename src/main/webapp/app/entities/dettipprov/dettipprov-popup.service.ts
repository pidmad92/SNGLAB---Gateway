import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Dettipprov } from './dettipprov.model';
import { DettipprovService } from './dettipprov.service';

@Injectable()
export class DettipprovPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private dettipprovService: DettipprovService

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
                this.dettipprovService.find(id).subscribe((dettipprov) => {
                    dettipprov.dFechareg = this.datePipe
                        .transform(dettipprov.dFechareg, 'yyyy-MM-ddTHH:mm:ss');
                    dettipprov.dFechaupd = this.datePipe
                        .transform(dettipprov.dFechaupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.dettipprovModalRef(component, dettipprov);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.dettipprovModalRef(component, new Dettipprov());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    dettipprovModalRef(component: Component, dettipprov: Dettipprov): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.dettipprov = dettipprov;
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
