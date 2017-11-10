import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Estexpedien } from './estexpedien.model';
import { EstexpedienService } from './estexpedien.service';

@Injectable()
export class EstexpedienPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private estexpedienService: EstexpedienService

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
                this.estexpedienService.find(id).subscribe((estexpedien) => {
                    estexpedien.dFechareg = this.datePipe
                        .transform(estexpedien.dFechareg, 'yyyy-MM-ddTHH:mm:ss');
                    estexpedien.dFechaupd = this.datePipe
                        .transform(estexpedien.dFechaupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.estexpedienModalRef(component, estexpedien);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.estexpedienModalRef(component, new Estexpedien());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    estexpedienModalRef(component: Component, estexpedien: Estexpedien): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.estexpedien = estexpedien;
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
