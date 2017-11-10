import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Resolucrd } from './resolucrd.model';
import { ResolucrdService } from './resolucrd.service';

@Component({
    selector: 'jhi-resolucrd-detail',
    templateUrl: './resolucrd-detail.component.html'
})
export class ResolucrdDetailComponent implements OnInit, OnDestroy {

    resolucrd: Resolucrd;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private resolucrdService: ResolucrdService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInResolucrds();
    }

    load(id) {
        this.resolucrdService.find(id).subscribe((resolucrd) => {
            this.resolucrd = resolucrd;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInResolucrds() {
        this.eventSubscriber = this.eventManager.subscribe(
            'resolucrdListModification',
            (response) => this.load(this.resolucrd.id)
        );
    }
}
