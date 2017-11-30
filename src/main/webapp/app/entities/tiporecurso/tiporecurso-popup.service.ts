import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Tiporecurso } from './tiporecurso.model';
import { TiporecursoService } from './tiporecurso.service';

@Injectable()
export class TiporecursoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private tiporecursoService: TiporecursoService

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
                this.tiporecursoService.find(id).subscribe((tiporecurso) => {
                    tiporecurso.tFecreg = this.datePipe
                        .transform(tiporecurso.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    tiporecurso.tFecupd = this.datePipe
                        .transform(tiporecurso.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.tiporecursoModalRef(component, tiporecurso);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.tiporecursoModalRef(component, new Tiporecurso());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    tiporecursoModalRef(component: Component, tiporecurso: Tiporecurso): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.tiporecurso = tiporecurso;
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
