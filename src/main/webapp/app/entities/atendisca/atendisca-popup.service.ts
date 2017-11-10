import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Atendisca } from './atendisca.model';
import { AtendiscaService } from './atendisca.service';

@Injectable()
export class AtendiscaPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private atendiscaService: AtendiscaService

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
                this.atendiscaService.find(id).subscribe((atendisca) => {
                    atendisca.dFechareg = this.datePipe
                        .transform(atendisca.dFechareg, 'yyyy-MM-ddTHH:mm:ss');
                    atendisca.dFechaupd = this.datePipe
                        .transform(atendisca.dFechaupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.atendiscaModalRef(component, atendisca);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.atendiscaModalRef(component, new Atendisca());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    atendiscaModalRef(component: Component, atendisca: Atendisca): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.atendisca = atendisca;
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
