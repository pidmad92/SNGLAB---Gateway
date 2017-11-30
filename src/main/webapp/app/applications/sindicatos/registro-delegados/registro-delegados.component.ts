import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiLanguageService } from 'ng-jhipster';

import { RegistroDelegadosService } from './registro-delegados.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../../shared';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';

@Component({
    selector: 'jhi-registro-delegados',
    templateUrl: './registro-delegados.component.html'
})
export class RegistroDelegadosComponent implements OnInit {
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;
    closeResult: string;
    isSaving: boolean;

    constructor(
        private eventManager: JhiEventManager,
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        /*this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAtencionEmpleador();*/
    }

    loadAll() {
        /*if (this.currentSearch) {
            this.atencionEmpleadorService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.empleador = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.atencionEmpleadorService.query().subscribe(
            (res: ResponseWrapper) => {
                this.empleador = res.json;
                this.currentSearch = '';
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );*/
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    private onSaveSuccess() {
        this.eventManager.broadcast({ name: 'horaListModification', content: 'OK'});
        this.isSaving = false;
        // this.activeModal.dismiss(result);
    }

    ver() {
        console.log('holaaaaaaaa');
    }

    /*ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }*/
}

@Component({
    selector: 'jhi-registro-delegados-popup',
    template: ''
})
export class RegistroDelegadosPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

        constructor(
            private route: ActivatedRoute,
            private registroDelegadosService: RegistroDelegadosService
        ) { }

        ngOnInit() {
            console.log('OpenDialog');
            this.routeSub = this.route.params.subscribe((params) => {
                if ( params['id'] ) {
                    this.registroDelegadosService
                        .open(RegistroDelegadosComponent as Component, params['id']);
                } else {
                    this.registroDelegadosService
                        .open(RegistroDelegadosComponent as Component);
                }
            });
        }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
