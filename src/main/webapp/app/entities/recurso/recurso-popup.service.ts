import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Recurso } from './recurso.model';
import { RecursoService } from './recurso.service';

@Injectable()
export class RecursoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private recursoService: RecursoService

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
                this.recursoService.find(id).subscribe((recurso) => {
                    recurso.tFecrecurs = this.datePipe
                        .transform(recurso.tFecrecurs, 'yyyy-MM-ddTHH:mm:ss');
                    recurso.tFecprovei = this.datePipe
                        .transform(recurso.tFecprovei, 'yyyy-MM-ddTHH:mm:ss');
                    recurso.tFecreg = this.datePipe
                        .transform(recurso.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    recurso.tFecupd = this.datePipe
                        .transform(recurso.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.recursoModalRef(component, recurso);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.recursoModalRef(component, new Recurso());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    recursoModalRef(component: Component, recurso: Recurso): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.recurso = recurso;
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
