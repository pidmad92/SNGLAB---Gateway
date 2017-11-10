import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Personajurid } from './personajurid.model';
import { PersonajuridService } from './personajurid.service';

@Injectable()
export class PersonajuridPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private personajuridService: PersonajuridService

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
                this.personajuridService.find(id).subscribe((personajurid) => {
                    personajurid.dFechareg = this.datePipe
                        .transform(personajurid.dFechareg, 'yyyy-MM-ddTHH:mm:ss');
                    personajurid.dFechaupd = this.datePipe
                        .transform(personajurid.dFechaupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.personajuridModalRef(component, personajurid);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.personajuridModalRef(component, new Personajurid());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    personajuridModalRef(component: Component, personajurid: Personajurid): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.personajurid = personajurid;
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
