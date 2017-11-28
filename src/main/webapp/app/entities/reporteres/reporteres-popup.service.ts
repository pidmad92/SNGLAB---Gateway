import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Reporteres } from './reporteres.model';
import { ReporteresService } from './reporteres.service';

@Injectable()
export class ReporteresPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private reporteresService: ReporteresService

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
                this.reporteresService.find(id).subscribe((reporteres) => {
                    reporteres.tFecreg = this.datePipe
                        .transform(reporteres.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    reporteres.tFecupd = this.datePipe
                        .transform(reporteres.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.reporteresModalRef(component, reporteres);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.reporteresModalRef(component, new Reporteres());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    reporteresModalRef(component: Component, reporteres: Reporteres): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.reporteres = reporteres;
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
