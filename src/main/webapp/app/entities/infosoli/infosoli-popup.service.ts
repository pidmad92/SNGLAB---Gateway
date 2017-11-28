import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Infosoli } from './infosoli.model';
import { InfosoliService } from './infosoli.service';

@Injectable()
export class InfosoliPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private infosoliService: InfosoliService

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
                this.infosoliService.find(id).subscribe((infosoli) => {
                    infosoli.tFecsoli = this.datePipe
                        .transform(infosoli.tFecsoli, 'yyyy-MM-ddTHH:mm:ss');
                    infosoli.tFecresp = this.datePipe
                        .transform(infosoli.tFecresp, 'yyyy-MM-ddTHH:mm:ss');
                    infosoli.tFecreg = this.datePipe
                        .transform(infosoli.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    infosoli.tFecupd = this.datePipe
                        .transform(infosoli.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.infosoliModalRef(component, infosoli);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.infosoliModalRef(component, new Infosoli());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    infosoliModalRef(component: Component, infosoli: Infosoli): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.infosoli = infosoli;
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
