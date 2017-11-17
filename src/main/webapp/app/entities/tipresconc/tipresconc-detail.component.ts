import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Tipresconc } from './tipresconc.model';
import { TipresconcService } from './tipresconc.service';

@Component({
    selector: 'jhi-tipresconc-detail',
    templateUrl: './tipresconc-detail.component.html'
})
export class TipresconcDetailComponent implements OnInit, OnDestroy {

    tipresconc: Tipresconc;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tipresconcService: TipresconcService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTipresconcs();
    }

    load(id) {
        this.tipresconcService.find(id).subscribe((tipresconc) => {
            this.tipresconc = tipresconc;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTipresconcs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tipresconcListModification',
            (response) => this.load(this.tipresconc.id)
        );
    }
}
