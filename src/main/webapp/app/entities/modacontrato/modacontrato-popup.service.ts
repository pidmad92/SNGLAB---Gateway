import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Modacontrato } from './modacontrato.model';
import { ModacontratoService } from './modacontrato.service';

@Injectable()
export class ModacontratoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private modacontratoService: ModacontratoService

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
                this.modacontratoService.find(id).subscribe((modacontrato) => {
                    modacontrato.dFechareg = this.datePipe
                        .transform(modacontrato.dFechareg, 'yyyy-MM-ddTHH:mm:ss');
                    modacontrato.dFechaupd = this.datePipe
                        .transform(modacontrato.dFechaupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.modacontratoModalRef(component, modacontrato);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.modacontratoModalRef(component, new Modacontrato());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    modacontratoModalRef(component: Component, modacontrato: Modacontrato): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.modacontrato = modacontrato;
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
