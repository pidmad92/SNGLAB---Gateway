import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Activecono } from './activecono.model';
import { ActiveconoService } from './activecono.service';

@Injectable()
export class ActiveconoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private activeconoService: ActiveconoService

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
                this.activeconoService.find(id).subscribe((activecono) => {
                    activecono.dFechareg = this.datePipe
                        .transform(activecono.dFechareg, 'yyyy-MM-ddTHH:mm:ss');
                    activecono.dFechaupd = this.datePipe
                        .transform(activecono.dFechaupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.activeconoModalRef(component, activecono);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.activeconoModalRef(component, new Activecono());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    activeconoModalRef(component: Component, activecono: Activecono): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.activecono = activecono;
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
