import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Docingreperc } from './docingreperc.model';
import { DocingrepercService } from './docingreperc.service';

@Injectable()
export class DocingrepercPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private docingrepercService: DocingrepercService

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
                this.docingrepercService.find(id).subscribe((docingreperc) => {
                    docingreperc.dFechareg = this.datePipe
                        .transform(docingreperc.dFechareg, 'yyyy-MM-ddTHH:mm:ss');
                    docingreperc.dFechaupd = this.datePipe
                        .transform(docingreperc.dFechaupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.docingrepercModalRef(component, docingreperc);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.docingrepercModalRef(component, new Docingreperc());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    docingrepercModalRef(component: Component, docingreperc: Docingreperc): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.docingreperc = docingreperc;
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
