import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Denuncia } from './denuncia.model';
import { DenunciaService } from './denuncia.service';

@Injectable()
export class DenunciaPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private denunciaService: DenunciaService

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
                this.denunciaService.find(id).subscribe((denuncia) => {
                    denuncia.tFecinitra = this.datePipe
                        .transform(denuncia.tFecinitra, 'yyyy-MM-ddTHH:mm:ss');
                    denuncia.tFeccese = this.datePipe
                        .transform(denuncia.tFeccese, 'yyyy-MM-ddTHH:mm:ss');
                    denuncia.tFecreg = this.datePipe
                        .transform(denuncia.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    denuncia.tFecupd = this.datePipe
                        .transform(denuncia.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.denunciaModalRef(component, denuncia);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.denunciaModalRef(component, new Denuncia());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    denunciaModalRef(component: Component, denuncia: Denuncia): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.denuncia = denuncia;
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
