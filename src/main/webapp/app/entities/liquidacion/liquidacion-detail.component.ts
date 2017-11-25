import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Liquidacion } from './liquidacion.model';
import { LiquidacionService } from './liquidacion.service';

@Component({
    selector: 'jhi-liquidacion-detail',
    templateUrl: './liquidacion-detail.component.html'
})
export class LiquidacionDetailComponent implements OnInit, OnDestroy {

    liquidacion: Liquidacion;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private liquidacionService: LiquidacionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInLiquidacions();
    }

    load(id) {
        this.liquidacionService.find(id).subscribe((liquidacion) => {
            this.liquidacion = liquidacion;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInLiquidacions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'liquidacionListModification',
            (response) => this.load(this.liquidacion.id)
        );
    }
}
