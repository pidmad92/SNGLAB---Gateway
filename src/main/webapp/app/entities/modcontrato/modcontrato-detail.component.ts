import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Modcontrato } from './modcontrato.model';
import { ModcontratoService } from './modcontrato.service';

@Component({
    selector: 'jhi-modcontrato-detail',
    templateUrl: './modcontrato-detail.component.html'
})
export class ModcontratoDetailComponent implements OnInit, OnDestroy {

    modcontrato: Modcontrato;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private modcontratoService: ModcontratoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInModcontratoes();
    }

    load(id) {
        this.modcontratoService.find(id).subscribe((modcontrato) => {
            this.modcontrato = modcontrato;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInModcontratoes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'modcontratoListModification',
            (response) => this.load(this.modcontrato.id)
        );
    }
}
