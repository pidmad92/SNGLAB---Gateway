import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Szonal } from './szonal.model';
import { SzonalService } from './szonal.service';

@Injectable()
export class SzonalPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private szonalService: SzonalService

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
                this.szonalService.find(id).subscribe((szonal) => {
                    szonal.tFecreg = this.datePipe
                        .transform(szonal.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    szonal.tFecupd = this.datePipe
                        .transform(szonal.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.szonalModalRef(component, szonal);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.szonalModalRef(component, new Szonal());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    szonalModalRef(component: Component, szonal: Szonal): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.szonal = szonal;
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
