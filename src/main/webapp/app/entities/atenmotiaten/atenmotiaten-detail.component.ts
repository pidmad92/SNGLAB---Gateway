import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Atenmotiaten } from './atenmotiaten.model';
import { AtenmotiatenService } from './atenmotiaten.service';

@Component({
    selector: 'jhi-atenmotiaten-detail',
    templateUrl: './atenmotiaten-detail.component.html'
})
export class AtenmotiatenDetailComponent implements OnInit, OnDestroy {

    atenmotiaten: Atenmotiaten;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private atenmotiatenService: AtenmotiatenService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAtenmotiatens();
    }

    load(id) {
        this.atenmotiatenService.find(id).subscribe((atenmotiaten) => {
            this.atenmotiaten = atenmotiaten;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAtenmotiatens() {
        this.eventSubscriber = this.eventManager.subscribe(
            'atenmotiatenListModification',
            (response) => this.load(this.atenmotiaten.id)
        );
    }
}
