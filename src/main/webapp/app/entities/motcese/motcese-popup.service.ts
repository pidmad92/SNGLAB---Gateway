import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Motcese } from './motcese.model';
import { MotceseService } from './motcese.service';

@Injectable()
export class MotcesePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private motceseService: MotceseService

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
                this.motceseService.find(id).subscribe((motcese) => {
                    motcese.tFecreg = this.datePipe
                        .transform(motcese.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    motcese.tFecupd = this.datePipe
                        .transform(motcese.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.motceseModalRef(component, motcese);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.motceseModalRef(component, new Motcese());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    motceseModalRef(component: Component, motcese: Motcese): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.motcese = motcese;
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
