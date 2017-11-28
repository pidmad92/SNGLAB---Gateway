import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Datdenu } from './datdenu.model';
import { DatdenuService } from './datdenu.service';

@Injectable()
export class DatdenuPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private datdenuService: DatdenuService

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
                this.datdenuService.find(id).subscribe((datdenu) => {
                    datdenu.tFecreg = this.datePipe
                        .transform(datdenu.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    datdenu.tFecupd = this.datePipe
                        .transform(datdenu.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.datdenuModalRef(component, datdenu);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.datdenuModalRef(component, new Datdenu());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    datdenuModalRef(component: Component, datdenu: Datdenu): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.datdenu = datdenu;
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
