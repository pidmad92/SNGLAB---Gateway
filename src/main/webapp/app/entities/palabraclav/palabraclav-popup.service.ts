import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Palabraclav } from './palabraclav.model';
import { PalabraclavService } from './palabraclav.service';

@Injectable()
export class PalabraclavPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private palabraclavService: PalabraclavService

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
                this.palabraclavService.find(id).subscribe((palabraclav) => {
                    palabraclav.tFecreg = this.datePipe
                        .transform(palabraclav.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    palabraclav.tFecupd = this.datePipe
                        .transform(palabraclav.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.palabraclavModalRef(component, palabraclav);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.palabraclavModalRef(component, new Palabraclav());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    palabraclavModalRef(component: Component, palabraclav: Palabraclav): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.palabraclav = palabraclav;
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
