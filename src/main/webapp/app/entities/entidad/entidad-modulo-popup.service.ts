import { ModuloService } from '../modulo/index';
import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Entidad } from './entidad.model';
import { EntidadService } from './entidad.service';
import { JhiDateUtils } from 'ng-jhipster';

import { ResponseWrapper } from '../../shared';
import { ModuloEntidad } from './../modulo-entidad/modulo-entidad.model';
import { ModuloEntidadService } from './../modulo-entidad/modulo-entidad.service';

@Injectable()
export class EntidadModuloPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private entidadService: EntidadService,
        private moduloService: ModuloService,
        private moduloEntidadService: ModuloEntidadService,
        dateUtils: JhiDateUtils
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
                this.moduloService.findByEntidad(id).subscribe((modulo) => {
                    this.ngbModalRef = this.entidadModalRef(component, modulo, id);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    /*this.ngbModalRef = this.entidadModalRef(component, new ResponseWrapper());*/
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    entidadModalRef(component: Component, modulo: ResponseWrapper, id: String): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'sm', backdrop: 'static'});
        modalRef.componentInstance.moduloEntidades = modulo.json;
        modalRef.componentInstance.idEntidad = id;
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
