import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Horacon } from './horacon.model';
import { HoraconService } from './horacon.service';

@Injectable()
export class HoraconPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private horaconService: HoraconService

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
                this.horaconService.find(id).subscribe((horacon) => {
                    horacon.tFecreg = this.datePipe
                        .transform(horacon.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    horacon.tFecupd = this.datePipe
                        .transform(horacon.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.horaconModalRef(component, horacon);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.horaconModalRef(component, new Horacon());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    horaconModalRef(component: Component, horacon: Horacon): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.horacon = horacon;
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
