import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Concilia } from './../../audiencias/concilia.model';
import { Expediente } from './../../audiencias/expediente.model';
import { ConciliaService } from './../../audiencias/concilia.service';
import { ExpedienteService } from './../../audiencias/expediente.service';

@Injectable()
export class DocumentoAsignacionPopupService {
    private ngbModalRef: NgbModalRef;
    urlexit: string;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private conciliaService: ConciliaService,
        private expedienteService: ExpedienteService

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
                this.expedienteService.find(id).subscribe((expediente) => {
                    /*concilia.tFecreg = this.datePipe
                        .transform(concilia.tFecreg, 'yyyy-MM-ddTHH:mm:ss');*/
                        if (expediente.dFecregexp) {
                            expediente.dFecregexp = {
                                year: expediente.dFecregexp.getFullYear(),
                                month: expediente.dFecregexp.getMonth() + 1,
                                day: expediente.dFecregexp.getDate()
                            };
                        }
                        expediente.tFecreg = this.datePipe
                            .transform(expediente.tFecreg, 'yyyy-MM-ddTHH:mm:ss');
                        expediente.tFecupd = this.datePipe
                            .transform(expediente.tFecupd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.audienciaAsignacionModalRef(component, expediente);
                    resolve(this.ngbModalRef);
                });
                /*setTimeout(() => {
                    this.ngbModalRef = this.audienciaAsignacionModalRef(component, new Expediente());
                    resolve(this.ngbModalRef);
                }, 0);*/
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.audienciaAsignacionModalRef(component, new Expediente());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    audienciaAsignacionModalRef(component: Component, expediente: Expediente): NgbModalRef {
        this.urlexit = '';

        if (this.router.url.indexOf('/defensa/expediente/consulta/exp-emitidos') === 0) {
            this.urlexit = '/defensa/expediente/consulta/exp-emitidos';
        } else if (this.router.url.indexOf('/defensa/expediente/consulta/exp-multados') === 0) {
            this.urlexit = '/defensa/expediente/consulta/exp-multados';
        }

        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.expediente = expediente;
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
