import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Calrcmperi } from './calrcmperi.model';
import { CalrcmperiService } from './calrcmperi.service';

@Injectable()
export class CalrcmperiPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private calrcmperiService: CalrcmperiService

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
                this.calrcmperiService.find(id).subscribe((calrcmperi) => {
                    calrcmperi.tFecreg = this.datePipe
                        .transform(calrcmperi.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    calrcmperi.tFecupd = this.datePipe
                        .transform(calrcmperi.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.calrcmperiModalRef(component, calrcmperi);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.calrcmperiModalRef(component, new Calrcmperi());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    calrcmperiModalRef(component: Component, calrcmperi: Calrcmperi): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.calrcmperi = calrcmperi;
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
