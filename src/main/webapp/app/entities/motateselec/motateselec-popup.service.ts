import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Motateselec } from './motateselec.model';
import { MotateselecService } from './motateselec.service';

@Injectable()
export class MotateselecPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private motateselecService: MotateselecService

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
                this.motateselecService.find(id).subscribe((motateselec) => {
                    motateselec.tFecreg = this.datePipe
                        .transform(motateselec.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    motateselec.tFecupd = this.datePipe
                        .transform(motateselec.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.motateselecModalRef(component, motateselec);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.motateselecModalRef(component, new Motateselec());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    motateselecModalRef(component: Component, motateselec: Motateselec): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.motateselec = motateselec;
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
