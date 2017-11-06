import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Pasemotiaten } from './pasemotiaten.model';
import { PasemotiatenService } from './pasemotiaten.service';

@Component({
    selector: 'jhi-pasemotiaten-detail',
    templateUrl: './pasemotiaten-detail.component.html'
})
export class PasemotiatenDetailComponent implements OnInit, OnDestroy {

    pasemotiaten: Pasemotiaten;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private pasemotiatenService: PasemotiatenService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPasemotiatens();
    }

    load(id) {
        this.pasemotiatenService.find(id).subscribe((pasemotiaten) => {
            this.pasemotiaten = pasemotiaten;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPasemotiatens() {
        this.eventSubscriber = this.eventManager.subscribe(
            'pasemotiatenListModification',
            (response) => this.load(this.pasemotiaten.id)
        );
    }
}
