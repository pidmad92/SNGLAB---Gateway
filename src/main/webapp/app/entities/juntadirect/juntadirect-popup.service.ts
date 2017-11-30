import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Juntadirect } from './juntadirect.model';
import { JuntadirectService } from './juntadirect.service';

@Injectable()
export class JuntadirectPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private juntadirectService: JuntadirectService

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
                this.juntadirectService.find(id).subscribe((juntadirect) => {
                    juntadirect.tFecinicio = this.datePipe
                        .transform(juntadirect.tFecinicio, 'yyyy-MM-ddTHH:mm:ss');
                    juntadirect.tFecrfinal = this.datePipe
                        .transform(juntadirect.tFecrfinal, 'yyyy-MM-ddTHH:mm:ss');
                    juntadirect.tFecreg = this.datePipe
                        .transform(juntadirect.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    juntadirect.tFecupd = this.datePipe
                        .transform(juntadirect.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.juntadirectModalRef(component, juntadirect);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.juntadirectModalRef(component, new Juntadirect());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    juntadirectModalRef(component: Component, juntadirect: Juntadirect): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.juntadirect = juntadirect;
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
