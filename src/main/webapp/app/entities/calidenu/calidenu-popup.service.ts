import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Calidenu } from './calidenu.model';
import { CalidenuService } from './calidenu.service';

@Injectable()
export class CalidenuPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private calidenuService: CalidenuService

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
                this.calidenuService.find(id).subscribe((calidenu) => {
                    calidenu.tFecreg = this.datePipe
                        .transform(calidenu.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    calidenu.tFecupd = this.datePipe
                        .transform(calidenu.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.calidenuModalRef(component, calidenu);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.calidenuModalRef(component, new Calidenu());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    calidenuModalRef(component: Component, calidenu: Calidenu): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.calidenu = calidenu;
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
