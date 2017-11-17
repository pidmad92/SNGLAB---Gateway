import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Tipproveid } from './tipproveid.model';
import { TipproveidService } from './tipproveid.service';

@Component({
    selector: 'jhi-tipproveid-detail',
    templateUrl: './tipproveid-detail.component.html'
})
export class TipproveidDetailComponent implements OnInit, OnDestroy {

    tipproveid: Tipproveid;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tipproveidService: TipproveidService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTipproveids();
    }

    load(id) {
        this.tipproveidService.find(id).subscribe((tipproveid) => {
            this.tipproveid = tipproveid;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTipproveids() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tipproveidListModification',
            (response) => this.load(this.tipproveid.id)
        );
    }
}
