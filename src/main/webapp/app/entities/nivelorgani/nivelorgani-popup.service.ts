import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Nivelorgani } from './nivelorgani.model';
import { NivelorganiService } from './nivelorgani.service';

@Injectable()
export class NivelorganiPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private nivelorganiService: NivelorganiService

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
                this.nivelorganiService.find(id).subscribe((nivelorgani) => {
                    nivelorgani.tFecreg = this.datePipe
                        .transform(nivelorgani.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    nivelorgani.tFecupd = this.datePipe
                        .transform(nivelorgani.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.nivelorganiModalRef(component, nivelorgani);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.nivelorganiModalRef(component, new Nivelorgani());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    nivelorganiModalRef(component: Component, nivelorgani: Nivelorgani): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.nivelorgani = nivelorgani;
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
