import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Dirpernat } from './dirpernat.model';
import { DirpernatService } from './dirpernat.service';

@Injectable()
export class DirpernatPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private dirpernatService: DirpernatService

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
                this.dirpernatService.find(id).subscribe((dirpernat) => {
                    dirpernat.tFecreg = this.datePipe
                        .transform(dirpernat.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    dirpernat.tFecupd = this.datePipe
                        .transform(dirpernat.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.dirpernatModalRef(component, dirpernat);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.dirpernatModalRef(component, new Dirpernat());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    dirpernatModalRef(component: Component, dirpernat: Dirpernat): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.dirpernat = dirpernat;
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
