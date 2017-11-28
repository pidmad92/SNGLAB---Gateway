import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Legajoasig } from './legajoasig.model';
import { LegajoasigService } from './legajoasig.service';

@Component({
    selector: 'jhi-legajoasig-detail',
    templateUrl: './legajoasig-detail.component.html'
})
export class LegajoasigDetailComponent implements OnInit, OnDestroy {

    legajoasig: Legajoasig;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private legajoasigService: LegajoasigService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInLegajoasigs();
    }

    load(id) {
        this.legajoasigService.find(id).subscribe((legajoasig) => {
            this.legajoasig = legajoasig;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInLegajoasigs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'legajoasigListModification',
            (response) => this.load(this.legajoasig.id)
        );
    }
}
