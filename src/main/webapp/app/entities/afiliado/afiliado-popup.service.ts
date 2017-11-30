import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Afiliado } from './afiliado.model';
import { AfiliadoService } from './afiliado.service';

@Injectable()
export class AfiliadoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private afiliadoService: AfiliadoService

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
                this.afiliadoService.find(id).subscribe((afiliado) => {
                    afiliado.tFecreg = this.datePipe
                        .transform(afiliado.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    afiliado.tFecupd = this.datePipe
                        .transform(afiliado.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.afiliadoModalRef(component, afiliado);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.afiliadoModalRef(component, new Afiliado());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    afiliadoModalRef(component: Component, afiliado: Afiliado): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.afiliado = afiliado;
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
