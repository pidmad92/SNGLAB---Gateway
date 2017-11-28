import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Tipresoluc } from './tipresoluc.model';
import { TipresolucService } from './tipresoluc.service';

@Injectable()
export class TipresolucPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private tipresolucService: TipresolucService

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
                this.tipresolucService.find(id).subscribe((tipresoluc) => {
                    tipresoluc.tFecreg = this.datePipe
                        .transform(tipresoluc.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    tipresoluc.tFecupd = this.datePipe
                        .transform(tipresoluc.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.tipresolucModalRef(component, tipresoluc);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.tipresolucModalRef(component, new Tipresoluc());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    tipresolucModalRef(component: Component, tipresoluc: Tipresoluc): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.tipresoluc = tipresoluc;
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
