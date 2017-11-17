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
                    docexpedien.dFecha = this.datePipe
                        .transform(docexpedien.dFecha, 'yyyy-MM-ddTHH:mm:ss');
                    docexpedien.dFechareg = this.datePipe
                        .transform(docexpedien.dFechareg, 'yyyy-MM-ddTHH:mm:ss');
                    docexpedien.dFechaupd = this.datePipe
                        .transform(docexpedien.dFechaupd, 'yyyy-MM-ddTHH:mm:ss');
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
