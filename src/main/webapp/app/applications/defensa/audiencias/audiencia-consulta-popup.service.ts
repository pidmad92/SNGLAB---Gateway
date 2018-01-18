import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Expediente } from './../../../entities/expediente/expediente.model';
import { Concilia } from './concilia.model';
import { ConciliaService } from './concilia.service';

@Injectable()
export class AudienciaConsultaPopupService {
    private ngbModalRef: NgbModalRef;
    urlexit: string;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private conciliaService: ConciliaService

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
                this.conciliaService.find(id).subscribe((concilia) => {
                    /*concilia.tFecreg = this.datePipe
                        .transform(concilia.tFecreg, 'yyyy-MM-ddTHH:mm:ss');*/
                        if (concilia.dFecconci) {
                            concilia.dFecconci = {
                                year: concilia.dFecconci.getFullYear(),
                                month: concilia.dFecconci.getMonth() + 1,
                                day: concilia.dFecconci.getDate()
                            };
                        }
                        concilia.tFecreg = this.datePipe
                            .transform(concilia.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                        concilia.tFecupd = this.datePipe
                            .transform(concilia.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.audienciaModalRef(component, concilia);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.audienciaModalRef(component, new Expediente());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    audienciaModalRef(component: Component, concilia: Concilia): NgbModalRef {
        this.urlexit = '';

        if (this.router.url.indexOf('/defensa/expediente/consulta/exp-emitidos') === 0) {
            this.urlexit = '/defensa/expediente/consulta/exp-emitidos';
        } else if (this.router.url.indexOf('/defensa/expediente/consulta/exp-paramultar') === 0) {
            this.urlexit = '/defensa/expediente/consulta/exp-paramultar';
        } else if (this.router.url.indexOf('/defensa/expediente/consulta/exp-multados') === 0) {
            this.urlexit = '/defensa/expediente/consulta/exp-multados';
        } else if (this.router.url.indexOf('/defensa/audiencia/consulta') === 0) {
            this.urlexit = '/defensa/audiencia/consulta';
        }

        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.concilia = concilia;
        modalRef.result.then((result) => {
            this.router.navigate([this.urlexit], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([this.urlexit], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
