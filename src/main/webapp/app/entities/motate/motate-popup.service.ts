import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Motate } from './motate.model';
import { MotateService } from './motate.service';

@Injectable()
export class MotatePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private motateService: MotateService

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
                this.motateService.find(id).subscribe((motate) => {
                    motate.tFecreg = this.datePipe
                        .transform(motate.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    motate.tFecupd = this.datePipe
                        .transform(motate.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.motateModalRef(component, motate);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.motateModalRef(component, new Motate());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    motateModalRef(component: Component, motate: Motate): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.motate = motate;
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
