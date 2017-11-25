import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Notifica } from './notifica.model';
import { NotificaService } from './notifica.service';

@Injectable()
export class NotificaPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private notificaService: NotificaService

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
                this.notificaService.find(id).subscribe((notifica) => {
                    notifica.tFecreg = this.datePipe
                        .transform(notifica.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    notifica.tFecupd = this.datePipe
                        .transform(notifica.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.notificaModalRef(component, notifica);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.notificaModalRef(component, new Notifica());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    notificaModalRef(component: Component, notifica: Notifica): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.notifica = notifica;
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
