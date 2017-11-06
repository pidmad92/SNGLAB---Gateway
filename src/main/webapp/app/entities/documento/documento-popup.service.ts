import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Documento } from './documento.model';
import { DocumentoService } from './documento.service';

@Injectable()
export class DocumentoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private documentoService: DocumentoService

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
                this.documentoService.find(id).subscribe((documento) => {
                    documento.dFechareg = this.datePipe
                        .transform(documento.dFechareg, 'yyyy-MM-ddTHH:mm:ss');
                    documento.dFechaupd = this.datePipe
                        .transform(documento.dFechaupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.documentoModalRef(component, documento);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.documentoModalRef(component, new Documento());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    documentoModalRef(component: Component, documento: Documento): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.documento = documento;
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
