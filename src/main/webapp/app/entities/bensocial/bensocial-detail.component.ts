import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Bensocial } from './bensocial.model';
import { BensocialService } from './bensocial.service';

@Component({
    selector: 'jhi-bensocial-detail',
    templateUrl: './bensocial-detail.component.html'
})
export class BensocialDetailComponent implements OnInit, OnDestroy {

    bensocial: Bensocial;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private bensocialService: BensocialService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBensocials();
    }

    load(id) {
        this.bensocialService.find(id).subscribe((bensocial) => {
            this.bensocial = bensocial;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBensocials() {
        this.eventSubscriber = this.eventManager.subscribe(
            'bensocialListModification',
            (response) => this.load(this.bensocial.id)
        );
    }
}
