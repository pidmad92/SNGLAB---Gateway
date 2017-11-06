import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Modacontrato } from './modacontrato.model';
import { ModacontratoService } from './modacontrato.service';

@Component({
    selector: 'jhi-modacontrato-detail',
    templateUrl: './modacontrato-detail.component.html'
})
export class ModacontratoDetailComponent implements OnInit, OnDestroy {

    modacontrato: Modacontrato;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private modacontratoService: ModacontratoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInModacontratoes();
    }

    load(id) {
        this.modacontratoService.find(id).subscribe((modacontrato) => {
            this.modacontrato = modacontrato;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInModacontratoes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'modacontratoListModification',
            (response) => this.load(this.modacontrato.id)
        );
    }
}
