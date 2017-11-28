import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Tipdocpj } from './tipdocpj.model';
import { TipdocpjService } from './tipdocpj.service';

@Injectable()
export class TipdocpjPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private tipdocpjService: TipdocpjService

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
                this.tipdocpjService.find(id).subscribe((tipdocpj) => {
                    tipdocpj.tFecreg = this.datePipe
                        .transform(tipdocpj.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    tipdocpj.tFecupd = this.datePipe
                        .transform(tipdocpj.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.tipdocpjModalRef(component, tipdocpj);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.tipdocpjModalRef(component, new Tipdocpj());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    tipdocpjModalRef(component: Component, tipdocpj: Tipdocpj): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.tipdocpj = tipdocpj;
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
