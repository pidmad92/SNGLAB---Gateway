import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Region } from './region.model';
import { RegionService } from './region.service';

@Injectable()
export class RegionPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private regionService: RegionService

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
                this.regionService.find(id).subscribe((region) => {
                    region.tFecreg = this.datePipe
                        .transform(region.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                    region.tFecupd = this.datePipe
                        .transform(region.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.regionModalRef(component, region);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.regionModalRef(component, new Region());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    regionModalRef(component: Component, region: Region): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.region = region;
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
