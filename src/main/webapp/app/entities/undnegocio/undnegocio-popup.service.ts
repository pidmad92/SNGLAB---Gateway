import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Undnegocio } from './undnegocio.model';
import { UndnegocioService } from './undnegocio.service';

@Injectable()
export class UndnegocioPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private undnegocioService: UndnegocioService

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
                this.undnegocioService.find(id).subscribe((undnegocio) => {
                    undnegocio.tFecreg = this.datePipe
                        .transform(undnegocio.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    undnegocio.tFecupd = this.datePipe
                        .transform(undnegocio.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.undnegocioModalRef(component, undnegocio);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.undnegocioModalRef(component, new Undnegocio());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    undnegocioModalRef(component: Component, undnegocio: Undnegocio): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.undnegocio = undnegocio;
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
