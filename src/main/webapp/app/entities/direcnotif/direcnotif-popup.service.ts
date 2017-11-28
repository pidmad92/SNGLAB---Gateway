import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Direcnotif } from './direcnotif.model';
import { DirecnotifService } from './direcnotif.service';

@Injectable()
export class DirecnotifPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private direcnotifService: DirecnotifService

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
                this.direcnotifService.find(id).subscribe((direcnotif) => {
                    direcnotif.tFecreg = this.datePipe
                        .transform(direcnotif.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    direcnotif.tFecupd = this.datePipe
                        .transform(direcnotif.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.direcnotifModalRef(component, direcnotif);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.direcnotifModalRef(component, new Direcnotif());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    direcnotifModalRef(component: Component, direcnotif: Direcnotif): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.direcnotif = direcnotif;
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
