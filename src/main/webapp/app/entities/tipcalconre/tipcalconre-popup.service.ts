import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Tipcalconre } from './tipcalconre.model';
import { TipcalconreService } from './tipcalconre.service';

@Injectable()
export class TipcalconrePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private tipcalconreService: TipcalconreService

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
                this.tipcalconreService.find(id).subscribe((tipcalconre) => {
                    tipcalconre.tFecreg = this.datePipe
                        .transform(tipcalconre.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    tipcalconre.tFecupd = this.datePipe
                        .transform(tipcalconre.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.tipcalconreModalRef(component, tipcalconre);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.tipcalconreModalRef(component, new Tipcalconre());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    tipcalconreModalRef(component: Component, tipcalconre: Tipcalconre): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.tipcalconre = tipcalconre;
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
