import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Pase } from './pase.model';
import { PaseService } from './pase.service';

@Component({
    selector: 'jhi-pase-detail',
    templateUrl: './pase-detail.component.html'
})
export class PaseDetailComponent implements OnInit, OnDestroy {

    pase: Pase;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private paseService: PaseService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPases();
    }

    load(id) {
        this.paseService.find(id).subscribe((pase) => {
            this.pase = pase;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPases() {
        this.eventSubscriber = this.eventManager.subscribe(
            'paseListModification',
            (response) => this.load(this.pase.id)
        );
    }
}
