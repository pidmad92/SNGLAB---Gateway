import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Pernatudire } from './pernatudire.model';
import { PernatudireService } from './pernatudire.service';

@Injectable()
export class PernatudirePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private pernatudireService: PernatudireService

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
                this.pernatudireService.find(id).subscribe((pernatudire) => {
                    pernatudire.dFechareg = this.datePipe
                        .transform(pernatudire.dFechareg, 'yyyy-MM-ddTHH:mm:ss');
                    pernatudire.dFechaupd = this.datePipe
                        .transform(pernatudire.dFechaupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.pernatudireModalRef(component, pernatudire);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.pernatudireModalRef(component, new Pernatudire());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    pernatudireModalRef(component: Component, pernatudire: Pernatudire): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.pernatudire = pernatudire;
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
