import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Tipoorganiz } from './tipoorganiz.model';
import { TipoorganizService } from './tipoorganiz.service';

@Injectable()
export class TipoorganizPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private tipoorganizService: TipoorganizService

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
                this.tipoorganizService.find(id).subscribe((tipoorganiz) => {
                    tipoorganiz.tFecreg = this.datePipe
                        .transform(tipoorganiz.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    tipoorganiz.tFecupd = this.datePipe
                        .transform(tipoorganiz.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.tipoorganizModalRef(component, tipoorganiz);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.tipoorganizModalRef(component, new Tipoorganiz());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    tipoorganizModalRef(component: Component, tipoorganiz: Tipoorganiz): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.tipoorganiz = tipoorganiz;
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
