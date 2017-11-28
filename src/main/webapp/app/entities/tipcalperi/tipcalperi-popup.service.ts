import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Tipcalperi } from './tipcalperi.model';
import { TipcalperiService } from './tipcalperi.service';

@Injectable()
export class TipcalperiPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private tipcalperiService: TipcalperiService

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
                this.tipcalperiService.find(id).subscribe((tipcalperi) => {
                    tipcalperi.tFecreg = this.datePipe
                        .transform(tipcalperi.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    tipcalperi.tFecupd = this.datePipe
                        .transform(tipcalperi.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.tipcalperiModalRef(component, tipcalperi);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.tipcalperiModalRef(component, new Tipcalperi());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    tipcalperiModalRef(component: Component, tipcalperi: Tipcalperi): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.tipcalperi = tipcalperi;
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
