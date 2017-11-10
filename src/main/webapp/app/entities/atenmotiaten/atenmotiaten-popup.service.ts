import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Atenmotiaten } from './atenmotiaten.model';
import { AtenmotiatenService } from './atenmotiaten.service';

@Injectable()
export class AtenmotiatenPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private atenmotiatenService: AtenmotiatenService

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
                this.atenmotiatenService.find(id).subscribe((atenmotiaten) => {
                    atenmotiaten.dFechareg = this.datePipe
                        .transform(atenmotiaten.dFechareg, 'yyyy-MM-ddTHH:mm:ss');
                    atenmotiaten.dFechaupd = this.datePipe
                        .transform(atenmotiaten.dFechaupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.atenmotiatenModalRef(component, atenmotiaten);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.atenmotiatenModalRef(component, new Atenmotiaten());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    atenmotiatenModalRef(component: Component, atenmotiaten: Atenmotiaten): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.atenmotiaten = atenmotiaten;
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
