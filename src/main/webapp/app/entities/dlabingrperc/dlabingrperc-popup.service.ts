import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Dlabingrperc } from './dlabingrperc.model';
import { DlabingrpercService } from './dlabingrperc.service';

@Injectable()
export class DlabingrpercPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private dlabingrpercService: DlabingrpercService

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
                this.dlabingrpercService.find(id).subscribe((dlabingrperc) => {
                    dlabingrperc.dFechareg = this.datePipe
                        .transform(dlabingrperc.dFechareg, 'yyyy-MM-ddTHH:mm:ss');
                    dlabingrperc.dFechaupd = this.datePipe
                        .transform(dlabingrperc.dFechaupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.dlabingrpercModalRef(component, dlabingrperc);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.dlabingrpercModalRef(component, new Dlabingrperc());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    dlabingrpercModalRef(component: Component, dlabingrperc: Dlabingrperc): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.dlabingrperc = dlabingrperc;
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
