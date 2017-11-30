import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Atencionpj } from './atencionpj.model';
import { AtencionpjService } from './atencionpj.service';

@Injectable()
export class AtencionpjPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private atencionpjService: AtencionpjService

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
                this.atencionpjService.find(id).subscribe((atencionpj) => {
                    if (atencionpj.dFecaten) {
                        atencionpj.dFecaten = {
                            year: atencionpj.dFecaten.getFullYear(),
                            month: atencionpj.dFecaten.getMonth() + 1,
                            day: atencionpj.dFecaten.getDate()
                        };
                    }
                    atencionpj.tFecreg = this.datePipe
                        .transform(atencionpj.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    atencionpj.tFecupd = this.datePipe
                        .transform(atencionpj.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.atencionpjModalRef(component, atencionpj);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.atencionpjModalRef(component, new Atencionpj());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    atencionpjModalRef(component: Component, atencionpj: Atencionpj): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.atencionpj = atencionpj;
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
