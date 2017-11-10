import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Atenaccadop } from './atenaccadop.model';
import { AtenaccadopService } from './atenaccadop.service';

@Injectable()
export class AtenaccadopPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private atenaccadopService: AtenaccadopService

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
                this.atenaccadopService.find(id).subscribe((atenaccadop) => {
                    atenaccadop.dFechareg = this.datePipe
                        .transform(atenaccadop.dFechareg, 'yyyy-MM-ddTHH:mm:ss');
                    atenaccadop.dFechaupd = this.datePipe
                        .transform(atenaccadop.dFechaupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.atenaccadopModalRef(component, atenaccadop);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.atenaccadopModalRef(component, new Atenaccadop());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    atenaccadopModalRef(component: Component, atenaccadop: Atenaccadop): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.atenaccadop = atenaccadop;
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
