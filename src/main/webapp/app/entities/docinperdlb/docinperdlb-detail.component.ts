import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Docinperdlb } from './docinperdlb.model';
import { DocinperdlbService } from './docinperdlb.service';

@Component({
    selector: 'jhi-docinperdlb-detail',
    templateUrl: './docinperdlb-detail.component.html'
})
export class DocinperdlbDetailComponent implements OnInit, OnDestroy {

    docinperdlb: Docinperdlb;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private docinperdlbService: DocinperdlbService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDocinperdlbs();
    }

    load(id) {
        this.docinperdlbService.find(id).subscribe((docinperdlb) => {
            this.docinperdlb = docinperdlb;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDocinperdlbs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'docinperdlbListModification',
            (response) => this.load(this.docinperdlb.id)
        );
    }
}
