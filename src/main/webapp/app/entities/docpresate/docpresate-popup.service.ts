import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Docpresate } from './docpresate.model';
import { DocpresateService } from './docpresate.service';

@Injectable()
export class DocpresatePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private docpresateService: DocpresateService

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
                this.docpresateService.find(id).subscribe((docpresate) => {
                    docpresate.tFecreg = this.datePipe
                        .transform(docpresate.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    docpresate.tFecupd = this.datePipe
                        .transform(docpresate.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.docpresateModalRef(component, docpresate);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.docpresateModalRef(component, new Docpresate());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    docpresateModalRef(component: Component, docpresate: Docpresate): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.docpresate = docpresate;
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
