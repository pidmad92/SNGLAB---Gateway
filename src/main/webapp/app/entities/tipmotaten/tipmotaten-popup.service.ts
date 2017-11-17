import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Tipmotaten } from './tipmotaten.model';
import { TipmotatenService } from './tipmotaten.service';

@Injectable()
export class TipmotatenPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private tipmotatenService: TipmotatenService

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
                this.tipmotatenService.find(id).subscribe((tipmotaten) => {
                    tipmotaten.dFechareg = this.datePipe
                        .transform(tipmotaten.dFechareg, 'yyyy-MM-ddTHH:mm:ss');
                    tipmotaten.dFechaupd = this.datePipe
                        .transform(tipmotaten.dFechaupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.tipmotatenModalRef(component, tipmotaten);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.tipmotatenModalRef(component, new Tipmotaten());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    tipmotatenModalRef(component: Component, tipmotaten: Tipmotaten): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.tipmotaten = tipmotaten;
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
