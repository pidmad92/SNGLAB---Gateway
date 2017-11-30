import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Federacion } from './federacion.model';
import { FederacionService } from './federacion.service';

@Component({
    selector: 'jhi-federacion-detail',
    templateUrl: './federacion-detail.component.html'
})
export class FederacionDetailComponent implements OnInit, OnDestroy {

    federacion: Federacion;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private federacionService: FederacionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInFederacions();
    }

    load(id) {
        this.federacionService.find(id).subscribe((federacion) => {
            this.federacion = federacion;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInFederacions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'federacionListModification',
            (response) => this.load(this.federacion.id)
        );
    }
}
