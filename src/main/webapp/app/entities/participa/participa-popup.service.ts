import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Participa } from './participa.model';
import { ParticipaService } from './participa.service';

@Injectable()
export class ParticipaPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private participaService: ParticipaService

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
                this.participaService.find(id).subscribe((participa) => {
                    participa.tFecreg = this.datePipe
                        .transform(participa.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    participa.tFecupd = this.datePipe
                        .transform(participa.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.participaModalRef(component, participa);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.participaModalRef(component, new Participa());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    participaModalRef(component: Component, participa: Participa): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.participa = participa;
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
