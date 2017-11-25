import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Segsalud } from './segsalud.model';
import { SegsaludService } from './segsalud.service';

@Injectable()
export class SegsaludPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private segsaludService: SegsaludService

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
                this.segsaludService.find(id).subscribe((segsalud) => {
                    segsalud.tFecreg = this.datePipe
                        .transform(segsalud.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    segsalud.tFecupd = this.datePipe
                        .transform(segsalud.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.segsaludModalRef(component, segsalud);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.segsaludModalRef(component, new Segsalud());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    segsaludModalRef(component: Component, segsalud: Segsalud): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.segsalud = segsalud;
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
