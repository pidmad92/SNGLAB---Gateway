import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Resulconci } from './resulconci.model';
import { ResulconciService } from './resulconci.service';

@Injectable()
export class MantenimientoResultadoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private resulconciService: ResulconciService

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
                this.resulconciService.find(id).subscribe((resulconci) => {
                    resulconci.tFecreg = this.datePipe
                        .transform(resulconci.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    resulconci.tFecupd = this.datePipe
                        .transform(resulconci.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.mantenimientoResultadoModalRef(component, resulconci);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.mantenimientoResultadoModalRef(component, new Resulconci());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    mantenimientoResultadoModalRef(component: Component, resulconci: Resulconci): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.resulconci = resulconci;
        modalRef.result.then((result) => {
            this.router.navigate(['defensa/mantenimiento/resultado'], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate(['defensa/mantenimiento/resultado'], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
