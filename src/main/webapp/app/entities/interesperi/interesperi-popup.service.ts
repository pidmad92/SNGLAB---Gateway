import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Interesperi } from './interesperi.model';
import { InteresperiService } from './interesperi.service';

@Injectable()
export class InteresperiPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private interesperiService: InteresperiService

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
                this.interesperiService.find(id).subscribe((interesperi) => {
                    interesperi.tFecreg = this.datePipe
                        .transform(interesperi.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    interesperi.tFecupd = this.datePipe
                        .transform(interesperi.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.interesperiModalRef(component, interesperi);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.interesperiModalRef(component, new Interesperi());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    interesperiModalRef(component: Component, interesperi: Interesperi): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.interesperi = interesperi;
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
