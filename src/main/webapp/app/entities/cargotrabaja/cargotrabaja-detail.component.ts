import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Cargotrabaja } from './cargotrabaja.model';
import { CargotrabajaService } from './cargotrabaja.service';

@Component({
    selector: 'jhi-cargotrabaja-detail',
    templateUrl: './cargotrabaja-detail.component.html'
})
export class CargotrabajaDetailComponent implements OnInit, OnDestroy {

    cargotrabaja: Cargotrabaja;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private cargotrabajaService: CargotrabajaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCargotrabajas();
    }

    load(id) {
        this.cargotrabajaService.find(id).subscribe((cargotrabaja) => {
            this.cargotrabaja = cargotrabaja;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCargotrabajas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'cargotrabajaListModification',
            (response) => this.load(this.cargotrabaja.id)
        );
    }
}
