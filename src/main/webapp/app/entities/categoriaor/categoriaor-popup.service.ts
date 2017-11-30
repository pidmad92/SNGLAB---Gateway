import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Categoriaor } from './categoriaor.model';
import { CategoriaorService } from './categoriaor.service';

@Injectable()
export class CategoriaorPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private categoriaorService: CategoriaorService

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
                this.categoriaorService.find(id).subscribe((categoriaor) => {
                    categoriaor.tFecreg = this.datePipe
                        .transform(categoriaor.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    categoriaor.tFecupd = this.datePipe
                        .transform(categoriaor.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.categoriaorModalRef(component, categoriaor);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.categoriaorModalRef(component, new Categoriaor());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    categoriaorModalRef(component: Component, categoriaor: Categoriaor): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.categoriaor = categoriaor;
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
