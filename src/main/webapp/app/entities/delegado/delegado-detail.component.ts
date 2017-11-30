import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Delegado } from './delegado.model';
import { DelegadoService } from './delegado.service';

@Component({
    selector: 'jhi-delegado-detail',
    templateUrl: './delegado-detail.component.html'
})
export class DelegadoDetailComponent implements OnInit, OnDestroy {

    delegado: Delegado;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private delegadoService: DelegadoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDelegados();
    }

    load(id) {
        this.delegadoService.find(id).subscribe((delegado) => {
            this.delegado = delegado;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDelegados() {
        this.eventSubscriber = this.eventManager.subscribe(
            'delegadoListModification',
            (response) => this.load(this.delegado.id)
        );
    }
}
