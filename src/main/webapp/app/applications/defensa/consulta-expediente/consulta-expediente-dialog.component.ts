import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ConsultaExpedientePopupService } from './consulta-expediente-popup.service';
import { ResponseWrapper } from './../../../shared';

@Component({
    selector: 'jhi-consulta-expediente-dialog',
    templateUrl: './consulta-expediente-dialog.component.html'
})
export class ConsultaExpedienteDialogComponent implements OnInit {

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager
    ) {

    }

    ngOnInit() {

    }
    clear() {
        this.activeModal.dismiss('cancel');
    }
}

@Component({
    selector: 'jhi-consulta-expediente-popup',
    template: ''
})
export class ConsultaExpedientePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private consultaExpedientePopupService: ConsultaExpedientePopupService
    ) {console.log('ABSC'); }

    ngOnInit() {
        console.log('12345');
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                console.log('1234523445');
                this.consultaExpedientePopupService
                    .open(ConsultaExpedienteDialogComponent as Component, params['id']);
            } else {
                console.log('1234523445');
                this.consultaExpedientePopupService
                    .open(ConsultaExpedienteDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
