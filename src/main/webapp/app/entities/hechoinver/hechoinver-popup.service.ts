import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Hechoinver } from './hechoinver.model';
import { HechoinverService } from './hechoinver.service';

@Injectable()
export class HechoinverPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private hechoinverService: HechoinverService

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
                this.hechoinverService.find(id).subscribe((hechoinver) => {
                    hechoinver.tFecreg = this.datePipe
                        .transform(hechoinver.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    hechoinver.tFecupd = this.datePipe
                        .transform(hechoinver.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.hechoinverModalRef(component, hechoinver);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.hechoinverModalRef(component, new Hechoinver());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    hechoinverModalRef(component: Component, hechoinver: Hechoinver): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.hechoinver = hechoinver;
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
