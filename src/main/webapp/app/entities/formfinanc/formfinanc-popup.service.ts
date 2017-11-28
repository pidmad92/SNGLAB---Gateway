import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Formfinanc } from './formfinanc.model';
import { FormfinancService } from './formfinanc.service';

@Injectable()
export class FormfinancPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private formfinancService: FormfinancService

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
                this.formfinancService.find(id).subscribe((formfinanc) => {
                    formfinanc.tFecreg = this.datePipe
                        .transform(formfinanc.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    formfinanc.tFecupd = this.datePipe
                        .transform(formfinanc.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.formfinancModalRef(component, formfinanc);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.formfinancModalRef(component, new Formfinanc());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    formfinancModalRef(component: Component, formfinanc: Formfinanc): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.formfinanc = formfinanc;
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
