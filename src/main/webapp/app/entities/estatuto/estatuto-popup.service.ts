import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Estatuto } from './estatuto.model';
import { EstatutoService } from './estatuto.service';

@Injectable()
export class EstatutoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private estatutoService: EstatutoService

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
                this.estatutoService.find(id).subscribe((estatuto) => {
                    estatuto.tFecestatu = this.datePipe
                        .transform(estatuto.tFecestatu, 'yyyy-MM-ddTHH:mm:ss');
                    estatuto.tFecreg = this.datePipe
                        .transform(estatuto.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    estatuto.tFecupd = this.datePipe
                        .transform(estatuto.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.estatutoModalRef(component, estatuto);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.estatutoModalRef(component, new Estatuto());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    estatutoModalRef(component: Component, estatuto: Estatuto): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.estatuto = estatuto;
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
