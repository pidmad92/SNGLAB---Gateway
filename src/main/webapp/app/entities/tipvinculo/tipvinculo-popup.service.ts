import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Tipvinculo } from './tipvinculo.model';
import { TipvinculoService } from './tipvinculo.service';

@Injectable()
export class TipvinculoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private tipvinculoService: TipvinculoService

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
                this.tipvinculoService.find(id).subscribe((tipvinculo) => {
                    tipvinculo.dFechareg = this.datePipe
                        .transform(tipvinculo.dFechareg, 'yyyy-MM-ddTHH:mm:ss');
                    tipvinculo.dFechaupd = this.datePipe
                        .transform(tipvinculo.dFechaupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.tipvinculoModalRef(component, tipvinculo);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.tipvinculoModalRef(component, new Tipvinculo());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    tipvinculoModalRef(component: Component, tipvinculo: Tipvinculo): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.tipvinculo = tipvinculo;
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
