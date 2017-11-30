import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Organizacio } from './organizacio.model';
import { OrganizacioService } from './organizacio.service';

@Injectable()
export class OrganizacioPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private organizacioService: OrganizacioService

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
                this.organizacioService.find(id).subscribe((organizacio) => {
                    organizacio.tFecregist = this.datePipe
                        .transform(organizacio.tFecregist, 'yyyy-MM-ddTHH:mm:ss');
                    organizacio.tFecpresen = this.datePipe
                        .transform(organizacio.tFecpresen, 'yyyy-MM-ddTHH:mm:ss');
                    organizacio.tFecconsta = this.datePipe
                        .transform(organizacio.tFecconsta, 'yyyy-MM-ddTHH:mm:ss');
                    organizacio.tFecreg = this.datePipe
                        .transform(organizacio.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    organizacio.tFecupd = this.datePipe
                        .transform(organizacio.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.organizacioModalRef(component, organizacio);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.organizacioModalRef(component, new Organizacio());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    organizacioModalRef(component: Component, organizacio: Organizacio): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.organizacio = organizacio;
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
