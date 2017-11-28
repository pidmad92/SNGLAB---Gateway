import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Expediente } from './../../../entities/expediente/expediente.model';
// import { AbogadoService } from './abogado.service';

@Injectable()
export class AudienciaRegistroEscritoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        // private abogadoService: AbogadoService

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
                    this.ngbModalRef = this.audienciaRegistroESCRITOModalRef(component, new Expediente());
                    resolve(this.ngbModalRef);
                }, 0);
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.audienciaRegistroESCRITOModalRef(component, new Expediente());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    audienciaRegistroESCRITOModalRef(component: Component, expediente: Expediente): NgbModalRef {
        const modalRef = this.modalService.open(component, {  backdrop: 'static'});
        modalRef.componentInstance.expediente = expediente;
        modalRef.result.then((result) => {
            this.router.navigate(['defensa/audiencia'], { replaceUrl: true });
            console.log('Cc-A');
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate(['defensa/audiencia'], { replaceUrl: true });
            console.log('Cc-B');
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
