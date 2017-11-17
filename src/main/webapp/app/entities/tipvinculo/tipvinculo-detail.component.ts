import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Tipvinculo } from './tipvinculo.model';
import { TipvinculoService } from './tipvinculo.service';

@Component({
    selector: 'jhi-tipvinculo-detail',
    templateUrl: './tipvinculo-detail.component.html'
})
export class TipvinculoDetailComponent implements OnInit, OnDestroy {

    tipvinculo: Tipvinculo;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tipvinculoService: TipvinculoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTipvinculos();
    }

    load(id) {
        this.tipvinculoService.find(id).subscribe((tipvinculo) => {
            this.tipvinculo = tipvinculo;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTipvinculos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tipvinculoListModification',
            (response) => this.load(this.tipvinculo.id)
        );
    }
}
