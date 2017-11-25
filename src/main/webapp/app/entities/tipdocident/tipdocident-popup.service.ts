import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Tipdocident } from './tipdocident.model';
import { TipdocidentService } from './tipdocident.service';

@Injectable()
export class TipdocidentPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private tipdocidentService: TipdocidentService

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
                this.tipdocidentService.find(id).subscribe((tipdocident) => {
                    tipdocident.tFecreg = this.datePipe
                        .transform(tipdocident.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    tipdocident.tFecupd = this.datePipe
                        .transform(tipdocident.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.tipdocidentModalRef(component, tipdocident);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.tipdocidentModalRef(component, new Tipdocident());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    tipdocidentModalRef(component: Component, tipdocident: Tipdocident): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.tipdocident = tipdocident;
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
