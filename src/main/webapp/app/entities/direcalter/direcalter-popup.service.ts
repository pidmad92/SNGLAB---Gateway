import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Direcalter } from './direcalter.model';
import { DirecalterService } from './direcalter.service';

@Injectable()
export class DirecalterPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private direcalterService: DirecalterService

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
                this.direcalterService.find(id).subscribe((direcalter) => {
                    direcalter.tFecreg = this.datePipe
                        .transform(direcalter.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    direcalter.tFecupd = this.datePipe
                        .transform(direcalter.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.direcalterModalRef(component, direcalter);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.direcalterModalRef(component, new Direcalter());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    direcalterModalRef(component: Component, direcalter: Direcalter): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.direcalter = direcalter;
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
