import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Resulnegoc } from './resulnegoc.model';
import { ResulnegocService } from './resulnegoc.service';

@Injectable()
export class ResulnegocPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private resulnegocService: ResulnegocService

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
                this.resulnegocService.find(id).subscribe((resulnegoc) => {
                    resulnegoc.tFecreneg = this.datePipe
                        .transform(resulnegoc.tFecreneg, 'yyyy-MM-ddTHH:mm:ss');
                    resulnegoc.tFecreg = this.datePipe
                        .transform(resulnegoc.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    resulnegoc.tFecupd = this.datePipe
                        .transform(resulnegoc.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.resulnegocModalRef(component, resulnegoc);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.resulnegocModalRef(component, new Resulnegoc());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    resulnegocModalRef(component: Component, resulnegoc: Resulnegoc): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.resulnegoc = resulnegoc;
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
