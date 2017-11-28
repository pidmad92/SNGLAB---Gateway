import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Actiecon } from './actiecon.model';
import { ActieconService } from './actiecon.service';

@Injectable()
export class ActieconPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private actieconService: ActieconService

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
                this.actieconService.find(id).subscribe((actiecon) => {
                    actiecon.tFecreg = this.datePipe
                        .transform(actiecon.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    actiecon.tFecupd = this.datePipe
                        .transform(actiecon.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.actieconModalRef(component, actiecon);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.actieconModalRef(component, new Actiecon());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    actieconModalRef(component: Component, actiecon: Actiecon): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.actiecon = actiecon;
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
