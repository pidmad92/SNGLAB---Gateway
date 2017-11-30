import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Empresa } from './empresa.model';
import { EmpresaService } from './empresa.service';

@Injectable()
export class EmpresaPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private empresaService: EmpresaService

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
                this.empresaService.find(id).subscribe((empresa) => {
                    empresa.tFecreg = this.datePipe
                        .transform(empresa.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    empresa.tFecupd = this.datePipe
                        .transform(empresa.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.empresaModalRef(component, empresa);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.empresaModalRef(component, new Empresa());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    empresaModalRef(component: Component, empresa: Empresa): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.empresa = empresa;
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
