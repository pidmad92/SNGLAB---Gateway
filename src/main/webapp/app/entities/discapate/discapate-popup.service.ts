import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Discapate } from './discapate.model';
import { DiscapateService } from './discapate.service';

@Injectable()
export class DiscapatePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private discapateService: DiscapateService

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
                this.discapateService.find(id).subscribe((discapate) => {
                    discapate.tFecreg = this.datePipe
                        .transform(discapate.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    discapate.tFecupd = this.datePipe
                        .transform(discapate.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.discapateModalRef(component, discapate);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.discapateModalRef(component, new Discapate());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    discapateModalRef(component: Component, discapate: Discapate): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.discapate = discapate;
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
