import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Tipolibro } from './tipolibro.model';
import { TipolibroService } from './tipolibro.service';

@Injectable()
export class TipolibroPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private tipolibroService: TipolibroService

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
                this.tipolibroService.find(id).subscribe((tipolibro) => {
                    tipolibro.tFecreg = this.datePipe
                        .transform(tipolibro.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    tipolibro.tFecupd = this.datePipe
                        .transform(tipolibro.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.tipolibroModalRef(component, tipolibro);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.tipolibroModalRef(component, new Tipolibro());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    tipolibroModalRef(component: Component, tipolibro: Tipolibro): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.tipolibro = tipolibro;
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
