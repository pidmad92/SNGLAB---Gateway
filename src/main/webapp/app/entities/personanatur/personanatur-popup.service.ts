import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Personanatur } from './personanatur.model';
import { PersonanaturService } from './personanatur.service';

@Injectable()
export class PersonanaturPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private personanaturService: PersonanaturService

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
                this.personanaturService.find(id).subscribe((personanatur) => {
                    personanatur.dFecnacimiento = this.datePipe
                        .transform(personanatur.dFecnacimiento, 'yyyy-MM-ddTHH:mm:ss');
                    personanatur.dFechareg = this.datePipe
                        .transform(personanatur.dFechareg, 'yyyy-MM-ddTHH:mm:ss');
                    personanatur.dFechaupd = this.datePipe
                        .transform(personanatur.dFechaupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.personanaturModalRef(component, personanatur);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.personanaturModalRef(component, new Personanatur());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    personanaturModalRef(component: Component, personanatur: Personanatur): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.personanatur = personanatur;
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
