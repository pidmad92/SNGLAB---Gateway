import { Injectable, Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiDateUtils } from 'ng-jhipster';

import { ResponseWrapper, createRequestOption } from '../../../shared';
import { RevisarSolicitudesService } from './revisar-solicitudes.service';

@Injectable()
export class EvaluarSolicitudesService {
    private ngbModalRef: NgbModalRef;
    private resourceUrl = '/consultas/api/empleador';
    private resourceSearchUrl = '/consultas/api/_search/empleador';

    constructor(
        private http: Http,
        private dateUtils: JhiDateUtils,
        private modalService: NgbModal,
        private router: Router,
        private revisarSolicitudesService: RevisarSolicitudesService
    ) {
            this.ngbModalRef = null;
        }

        open(component: Component) {
            const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
            modalRef.result.then((result) => {
                this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
                this.ngbModalRef = null;
            }, (reason) => {
                this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
                this.ngbModalRef = null;
            });
        }

    /*open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            // const isOpen = this.ngbModalRef !== null;
            /*if (isOpen) {
                resolve(this.ngbModalRef);
            }
            this.ngbModalRef = this.horaModalRef(component);*/
            // this.horaModalRef(component);
            // resolve(this.ngbModalRef);
        // });
    // }*/

    horaModalRef(component: Component): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
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
