import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Califica } from './califica.model';
import { CalificaService } from './califica.service';

@Injectable()
export class CalificaPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private calificaService: CalificaService

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
                this.calificaService.find(id).subscribe((califica) => {
                    califica.tFecreg = this.datePipe
                        .transform(califica.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    califica.tFecupd = this.datePipe
                        .transform(califica.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.calificaModalRef(component, califica);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.calificaModalRef(component, new Califica());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    calificaModalRef(component: Component, califica: Califica): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.califica = califica;
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
