import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Solicform } from './solicform.model';
import { SolicformService } from './solicform.service';

@Injectable()
export class SolicformPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private solicformService: SolicformService

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
                this.solicformService.find(id).subscribe((solicform) => {
                    solicform.tFecreg = this.datePipe
                        .transform(solicform.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    solicform.tFecupd = this.datePipe
                        .transform(solicform.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.solicformModalRef(component, solicform);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.solicformModalRef(component, new Solicform());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    solicformModalRef(component: Component, solicform: Solicform): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.solicform = solicform;
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
