import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { ModuloEntidad } from './modulo-entidad.model';
import { ModuloEntidadService } from './modulo-entidad.service';

@Injectable()
export class ModuloEntidadPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private moduloEntidadService: ModuloEntidadService

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
                this.moduloEntidadService.find(id).subscribe((moduloEntidad) => {
                    moduloEntidad.datFechaLog = this.datePipe
                        .transform(moduloEntidad.datFechaLog, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.moduloEntidadModalRef(component, moduloEntidad);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.moduloEntidadModalRef(component, new ModuloEntidad());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    moduloEntidadModalRef(component: Component, moduloEntidad: ModuloEntidad): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.moduloEntidad = moduloEntidad;
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
