import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Cargotrabaja } from './cargotrabaja.model';
import { CargotrabajaService } from './cargotrabaja.service';

@Injectable()
export class CargotrabajaPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private cargotrabajaService: CargotrabajaService

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
                this.cargotrabajaService.find(id).subscribe((cargotrabaja) => {
                    cargotrabaja.dFechareg = this.datePipe
                        .transform(cargotrabaja.dFechareg, 'yyyy-MM-ddTHH:mm:ss');
                    cargotrabaja.dFechaupd = this.datePipe
                        .transform(cargotrabaja.dFechaupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.cargotrabajaModalRef(component, cargotrabaja);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.cargotrabajaModalRef(component, new Cargotrabaja());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    cargotrabajaModalRef(component: Component, cargotrabaja: Cargotrabaja): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.cargotrabaja = cargotrabaja;
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
