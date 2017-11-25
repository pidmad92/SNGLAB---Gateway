import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Solicitud } from './solicitud.model';
import { SolicitudService } from './solicitud.service';

@Injectable()
export class SolicitudPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private solicitudService: SolicitudService

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
                this.solicitudService.find(id).subscribe((solicitud) => {
                    solicitud.tFecsolic = this.datePipe
                        .transform(solicitud.tFecsolic, 'yyyy-MM-ddTHH:mm:ss');
                    solicitud.tFecenvio = this.datePipe
                        .transform(solicitud.tFecenvio, 'yyyy-MM-ddTHH:mm:ss');
                    solicitud.tFecvigde = this.datePipe
                        .transform(solicitud.tFecvigde, 'yyyy-MM-ddTHH:mm:ss');
                    solicitud.tFecvigha = this.datePipe
                        .transform(solicitud.tFecvigha, 'yyyy-MM-ddTHH:mm:ss');
                    solicitud.tFecreg = this.datePipe
                        .transform(solicitud.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    solicitud.tFecupd = this.datePipe
                        .transform(solicitud.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.solicitudModalRef(component, solicitud);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.solicitudModalRef(component, new Solicitud());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    solicitudModalRef(component: Component, solicitud: Solicitud): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.solicitud = solicitud;
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
