import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Tipenvnot } from './tipenvnot.model';
import { TipenvnotService } from './tipenvnot.service';

@Component({
    selector: 'jhi-tipenvnot-detail',
    templateUrl: './tipenvnot-detail.component.html'
})
export class TipenvnotDetailComponent implements OnInit, OnDestroy {

    tipenvnot: Tipenvnot;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tipenvnotService: TipenvnotService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTipenvnots();
    }

    load(id) {
        this.tipenvnotService.find(id).subscribe((tipenvnot) => {
            this.tipenvnot = tipenvnot;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTipenvnots() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tipenvnotListModification',
            (response) => this.load(this.tipenvnot.id)
        );
    }
}
