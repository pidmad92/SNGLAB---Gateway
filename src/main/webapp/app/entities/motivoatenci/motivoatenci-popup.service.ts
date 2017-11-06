import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Motivoatenci } from './motivoatenci.model';
import { MotivoatenciService } from './motivoatenci.service';

@Injectable()
export class MotivoatenciPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private motivoatenciService: MotivoatenciService

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
                this.motivoatenciService.find(id).subscribe((motivoatenci) => {
                    motivoatenci.dFechareg = this.datePipe
                        .transform(motivoatenci.dFechareg, 'yyyy-MM-ddTHH:mm:ss');
                    motivoatenci.dFechaupd = this.datePipe
                        .transform(motivoatenci.dFechaupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.motivoatenciModalRef(component, motivoatenci);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.motivoatenciModalRef(component, new Motivoatenci());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    motivoatenciModalRef(component: Component, motivoatenci: Motivoatenci): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.motivoatenci = motivoatenci;
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
