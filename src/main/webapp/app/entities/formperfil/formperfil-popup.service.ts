import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Formperfil } from './formperfil.model';
import { FormperfilService } from './formperfil.service';

@Injectable()
export class FormperfilPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private formperfilService: FormperfilService

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
                this.formperfilService.find(id).subscribe((formperfil) => {
                    formperfil.tFecreg = this.datePipe
                        .transform(formperfil.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    formperfil.tFecupd = this.datePipe
                        .transform(formperfil.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.formperfilModalRef(component, formperfil);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.formperfilModalRef(component, new Formperfil());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    formperfilModalRef(component: Component, formperfil: Formperfil): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.formperfil = formperfil;
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
