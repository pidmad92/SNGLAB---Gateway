import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Tipdocexp } from './tipdocexp.model';
import { TipdocexpService } from './tipdocexp.service';

@Injectable()
export class TipdocexpPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private tipdocexpService: TipdocexpService

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
                this.tipdocexpService.find(id).subscribe((tipdocexp) => {
                    tipdocexp.dFechareg = this.datePipe
                        .transform(tipdocexp.dFechareg, 'yyyy-MM-ddTHH:mm:ss');
                    tipdocexp.dFechaupd = this.datePipe
                        .transform(tipdocexp.dFechaupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.tipdocexpModalRef(component, tipdocexp);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.tipdocexpModalRef(component, new Tipdocexp());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    tipdocexpModalRef(component: Component, tipdocexp: Tipdocexp): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.tipdocexp = tipdocexp;
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
