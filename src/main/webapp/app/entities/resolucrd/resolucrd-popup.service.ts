import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Resolucrd } from './resolucrd.model';
import { ResolucrdService } from './resolucrd.service';

@Injectable()
export class ResolucrdPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private resolucrdService: ResolucrdService

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
                this.resolucrdService.find(id).subscribe((resolucrd) => {
                    resolucrd.dFecresolucionsd = this.datePipe
                        .transform(resolucrd.dFecresolucionsd, 'yyyy-MM-ddTHH:mm:ss');
                    resolucrd.dFechaconciliacion = this.datePipe
                        .transform(resolucrd.dFechaconciliacion, 'yyyy-MM-ddTHH:mm:ss');
                    resolucrd.dFechanotificacion = this.datePipe
                        .transform(resolucrd.dFechanotificacion, 'yyyy-MM-ddTHH:mm:ss');
                    resolucrd.dFechareg = this.datePipe
                        .transform(resolucrd.dFechareg, 'yyyy-MM-ddTHH:mm:ss');
                    resolucrd.dFechaupd = this.datePipe
                        .transform(resolucrd.dFechaupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.resolucrdModalRef(component, resolucrd);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.resolucrdModalRef(component, new Resolucrd());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    resolucrdModalRef(component: Component, resolucrd: Resolucrd): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.resolucrd = resolucrd;
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
