import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Modcontrato } from './modcontrato.model';
import { ModcontratoService } from './modcontrato.service';

@Injectable()
export class ModcontratoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private modcontratoService: ModcontratoService

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
                this.modcontratoService.find(id).subscribe((modcontrato) => {
                    modcontrato.tFecreg = this.datePipe
                        .transform(modcontrato.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    modcontrato.tFecupd = this.datePipe
                        .transform(modcontrato.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.modcontratoModalRef(component, modcontrato);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.modcontratoModalRef(component, new Modcontrato());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    modcontratoModalRef(component: Component, modcontrato: Modcontrato): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.modcontrato = modcontrato;
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
