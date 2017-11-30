import { Injectable, Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiDateUtils } from 'ng-jhipster';

import { ResponseWrapper, createRequestOption } from '../../../shared';

@Injectable()
export class EvaluarService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router
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
                    // this.abogadoService.find(id).subscribe((abogado) => {
                    //     this.ngbModalRef = this.abogadoModalRef(component, abogado);
                    //     resolve(this.ngbModalRef);
                    // });
                    setTimeout(() => {
                        this.ngbModalRef = this.horaModalRef(component);
                        resolve(this.ngbModalRef);
                    }, 0);
                } else {
                    // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                    setTimeout(() => {
                        this.ngbModalRef = this.horaModalRef(component);
                        resolve(this.ngbModalRef);
                    }, 0);
                }
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
            // this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.router.navigate(['sindicatos/bandeja'], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate(['sindicatos/bandeja'], { replaceUrl: true });
            // this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }

}
