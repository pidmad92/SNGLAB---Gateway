import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Librosindic } from './librosindic.model';
import { LibrosindicService } from './librosindic.service';

@Injectable()
export class LibrosindicPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private librosindicService: LibrosindicService

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
                this.librosindicService.find(id).subscribe((librosindic) => {
                    librosindic.tFecresolu = this.datePipe
                        .transform(librosindic.tFecresolu, 'yyyy-MM-ddTHH:mm:ss');
                    librosindic.tFecreg = this.datePipe
                        .transform(librosindic.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    librosindic.tFecupd = this.datePipe
                        .transform(librosindic.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.librosindicModalRef(component, librosindic);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.librosindicModalRef(component, new Librosindic());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    librosindicModalRef(component: Component, librosindic: Librosindic): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.librosindic = librosindic;
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
