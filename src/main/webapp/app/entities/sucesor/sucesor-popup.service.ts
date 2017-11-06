import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Sucesor } from './sucesor.model';
import { SucesorService } from './sucesor.service';

@Injectable()
export class SucesorPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private sucesorService: SucesorService

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
                this.sucesorService.find(id).subscribe((sucesor) => {
                    sucesor.dFechareg = this.datePipe
                        .transform(sucesor.dFechareg, 'yyyy-MM-ddTHH:mm:ss');
                    sucesor.dFechaupd = this.datePipe
                        .transform(sucesor.dFechaupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.sucesorModalRef(component, sucesor);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.sucesorModalRef(component, new Sucesor());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    sucesorModalRef(component: Component, sucesor: Sucesor): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.sucesor = sucesor;
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
