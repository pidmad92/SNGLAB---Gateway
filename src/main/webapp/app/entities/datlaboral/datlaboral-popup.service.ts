import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Datlaboral } from './datlaboral.model';
import { DatlaboralService } from './datlaboral.service';

@Injectable()
export class DatlaboralPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private datlaboralService: DatlaboralService

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
                this.datlaboralService.find(id).subscribe((datlaboral) => {
                    datlaboral.dFecvinculo = this.datePipe
                        .transform(datlaboral.dFecvinculo, 'yyyy-MM-ddTHH:mm:ss');
                    datlaboral.dFeccese = this.datePipe
                        .transform(datlaboral.dFeccese, 'yyyy-MM-ddTHH:mm:ss');
                    datlaboral.dFecfincontrato = this.datePipe
                        .transform(datlaboral.dFecfincontrato, 'yyyy-MM-ddTHH:mm:ss');
                    datlaboral.dFechareg = this.datePipe
                        .transform(datlaboral.dFechareg, 'yyyy-MM-ddTHH:mm:ss');
                    datlaboral.dFechaupd = this.datePipe
                        .transform(datlaboral.dFechaupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.datlaboralModalRef(component, datlaboral);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.datlaboralModalRef(component, new Datlaboral());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    datlaboralModalRef(component: Component, datlaboral: Datlaboral): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.datlaboral = datlaboral;
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
