import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Docexpedien } from './docexpedien.model';
import { DocexpedienService } from './docexpedien.service';

@Injectable()
export class DocexpedienPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private docexpedienService: DocexpedienService

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
                this.docexpedienService.find(id).subscribe((docexpedien) => {
                    if (docexpedien.dFechadoc) {
                        docexpedien.dFechadoc = {
                            year: docexpedien.dFechadoc.getFullYear(),
                            month: docexpedien.dFechadoc.getMonth() + 1,
                            day: docexpedien.dFechadoc.getDate()
                        };
                    }
                    docexpedien.tFecreg = this.datePipe
                        .transform(docexpedien.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    docexpedien.tFecupd = this.datePipe
                        .transform(docexpedien.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.docexpedienModalRef(component, docexpedien);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.docexpedienModalRef(component, new Docexpedien());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    docexpedienModalRef(component: Component, docexpedien: Docexpedien): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.docexpedien = docexpedien;
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
