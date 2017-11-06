import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { TipoEntidad } from './tipo-entidad.model';
import { TipoEntidadService } from './tipo-entidad.service';

@Injectable()
export class TipoEntidadPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private tipoEntidadService: TipoEntidadService

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
                this.tipoEntidadService.find(id).subscribe((tipoEntidad) => {
                    tipoEntidad.datFechaLog = this.datePipe
                        .transform(tipoEntidad.datFechaLog, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.tipoEntidadModalRef(component, tipoEntidad);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.tipoEntidadModalRef(component, new TipoEntidad());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    tipoEntidadModalRef(component: Component, tipoEntidad: TipoEntidad): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.tipoEntidad = tipoEntidad;
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
