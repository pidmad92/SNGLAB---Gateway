import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Respinforma } from './respinforma.model';
import { RespinformaService } from './respinforma.service';

@Injectable()
export class RespinformaPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private respinformaService: RespinformaService

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
                this.respinformaService.find(id).subscribe((respinforma) => {
                    respinforma.tFecreg = this.datePipe
                        .transform(respinforma.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    respinforma.tFecupd = this.datePipe
                        .transform(respinforma.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.respinformaModalRef(component, respinforma);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.respinformaModalRef(component, new Respinforma());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    respinformaModalRef(component: Component, respinforma: Respinforma): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.respinforma = respinforma;
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
