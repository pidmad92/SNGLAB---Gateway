import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Conceprem } from './conceprem.model';
import { ConcepremService } from './conceprem.service';

@Injectable()
export class ConcepremPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private concepremService: ConcepremService

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
                this.concepremService.find(id).subscribe((conceprem) => {
                    conceprem.tFecreg = this.datePipe
                        .transform(conceprem.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    conceprem.tFecupd = this.datePipe
                        .transform(conceprem.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.concepremModalRef(component, conceprem);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.concepremModalRef(component, new Conceprem());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    concepremModalRef(component: Component, conceprem: Conceprem): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.conceprem = conceprem;
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
