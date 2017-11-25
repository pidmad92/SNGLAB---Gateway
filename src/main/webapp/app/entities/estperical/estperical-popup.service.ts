import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Estperical } from './estperical.model';
import { EstpericalService } from './estperical.service';

@Injectable()
export class EstpericalPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private estpericalService: EstpericalService

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
                this.estpericalService.find(id).subscribe((estperical) => {
                    estperical.tFecreg = this.datePipe
                        .transform(estperical.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    estperical.tFecupd = this.datePipe
                        .transform(estperical.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.estpericalModalRef(component, estperical);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.estpericalModalRef(component, new Estperical());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    estpericalModalRef(component: Component, estperical: Estperical): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.estperical = estperical;
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
