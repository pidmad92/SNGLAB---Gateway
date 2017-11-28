import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Resolutor } from './resolutor.model';
import { ResolutorService } from './resolutor.service';

@Injectable()
export class ResolutorPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private resolutorService: ResolutorService

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
                this.resolutorService.find(id).subscribe((resolutor) => {
                    resolutor.tFecreg = this.datePipe
                        .transform(resolutor.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    resolutor.tFecupd = this.datePipe
                        .transform(resolutor.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.resolutorModalRef(component, resolutor);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.resolutorModalRef(component, new Resolutor());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    resolutorModalRef(component: Component, resolutor: Resolutor): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.resolutor = resolutor;
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
