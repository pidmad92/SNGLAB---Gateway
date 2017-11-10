import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Docpresenta } from './docpresenta.model';
import { DocpresentaService } from './docpresenta.service';

@Injectable()
export class DocpresentaPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private docpresentaService: DocpresentaService

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
                this.docpresentaService.find(id).subscribe((docpresenta) => {
                    docpresenta.dFechareg = this.datePipe
                        .transform(docpresenta.dFechareg, 'yyyy-MM-ddTHH:mm:ss');
                    docpresenta.dFechaupd = this.datePipe
                        .transform(docpresenta.dFechaupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.docpresentaModalRef(component, docpresenta);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.docpresentaModalRef(component, new Docpresenta());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    docpresentaModalRef(component: Component, docpresenta: Docpresenta): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.docpresenta = docpresenta;
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
