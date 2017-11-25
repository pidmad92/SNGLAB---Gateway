import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Dirperjuri } from './dirperjuri.model';
import { DirperjuriService } from './dirperjuri.service';

@Injectable()
export class DirperjuriPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private dirperjuriService: DirperjuriService

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
                this.dirperjuriService.find(id).subscribe((dirperjuri) => {
                    dirperjuri.tFecreg = this.datePipe
                        .transform(dirperjuri.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    dirperjuri.tFecupd = this.datePipe
                        .transform(dirperjuri.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.dirperjuriModalRef(component, dirperjuri);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.dirperjuriModalRef(component, new Dirperjuri());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    dirperjuriModalRef(component: Component, dirperjuri: Dirperjuri): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.dirperjuri = dirperjuri;
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
