import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Legtipdoc } from './legtipdoc.model';
import { LegtipdocService } from './legtipdoc.service';

@Injectable()
export class LegtipdocPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private legtipdocService: LegtipdocService

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
                this.legtipdocService.find(id).subscribe((legtipdoc) => {
                    if (legtipdoc.dFecdoc) {
                        legtipdoc.dFecdoc = {
                            year: legtipdoc.dFecdoc.getFullYear(),
                            month: legtipdoc.dFecdoc.getMonth() + 1,
                            day: legtipdoc.dFecdoc.getDate()
                        };
                    }
                    if (legtipdoc.dFecentr) {
                        legtipdoc.dFecentr = {
                            year: legtipdoc.dFecentr.getFullYear(),
                            month: legtipdoc.dFecentr.getMonth() + 1,
                            day: legtipdoc.dFecentr.getDate()
                        };
                    }
                    if (legtipdoc.dFecdev) {
                        legtipdoc.dFecdev = {
                            year: legtipdoc.dFecdev.getFullYear(),
                            month: legtipdoc.dFecdev.getMonth() + 1,
                            day: legtipdoc.dFecdev.getDate()
                        };
                    }
                    if (legtipdoc.dFecrecjuz) {
                        legtipdoc.dFecrecjuz = {
                            year: legtipdoc.dFecrecjuz.getFullYear(),
                            month: legtipdoc.dFecrecjuz.getMonth() + 1,
                            day: legtipdoc.dFecrecjuz.getDate()
                        };
                    }
                    if (legtipdoc.dFecmod) {
                        legtipdoc.dFecmod = {
                            year: legtipdoc.dFecmod.getFullYear(),
                            month: legtipdoc.dFecmod.getMonth() + 1,
                            day: legtipdoc.dFecmod.getDate()
                        };
                    }
                    if (legtipdoc.dFeccit) {
                        legtipdoc.dFeccit = {
                            year: legtipdoc.dFeccit.getFullYear(),
                            month: legtipdoc.dFeccit.getMonth() + 1,
                            day: legtipdoc.dFeccit.getDate()
                        };
                    }
                    if (legtipdoc.dFecdocreq) {
                        legtipdoc.dFecdocreq = {
                            year: legtipdoc.dFecdocreq.getFullYear(),
                            month: legtipdoc.dFecdocreq.getMonth() + 1,
                            day: legtipdoc.dFecdocreq.getDate()
                        };
                    }
                    legtipdoc.tFecreg = this.datePipe
                        .transform(legtipdoc.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    legtipdoc.tFecupd = this.datePipe
                        .transform(legtipdoc.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.legtipdocModalRef(component, legtipdoc);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.legtipdocModalRef(component, new Legtipdoc());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    legtipdocModalRef(component: Component, legtipdoc: Legtipdoc): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.legtipdoc = legtipdoc;
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
