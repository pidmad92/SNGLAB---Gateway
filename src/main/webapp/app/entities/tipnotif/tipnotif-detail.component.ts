import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Tipnotif } from './tipnotif.model';
import { TipnotifService } from './tipnotif.service';

@Component({
    selector: 'jhi-tipnotif-detail',
    templateUrl: './tipnotif-detail.component.html'
})
export class TipnotifDetailComponent implements OnInit, OnDestroy {

    tipnotif: Tipnotif;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tipnotifService: TipnotifService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTipnotifs();
    }

    load(id) {
        this.tipnotifService.find(id).subscribe((tipnotif) => {
            this.tipnotif = tipnotif;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTipnotifs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tipnotifListModification',
            (response) => this.load(this.tipnotif.id)
        );
    }
}
