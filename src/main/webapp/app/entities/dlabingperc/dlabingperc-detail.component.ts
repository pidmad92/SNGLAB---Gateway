import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Dlabingperc } from './dlabingperc.model';
import { DlabingpercService } from './dlabingperc.service';

@Component({
    selector: 'jhi-dlabingperc-detail',
    templateUrl: './dlabingperc-detail.component.html'
})
export class DlabingpercDetailComponent implements OnInit, OnDestroy {

    dlabingperc: Dlabingperc;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dlabingpercService: DlabingpercService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDlabingpercs();
    }

    load(id) {
        this.dlabingpercService.find(id).subscribe((dlabingperc) => {
            this.dlabingperc = dlabingperc;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDlabingpercs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'dlabingpercListModification',
            (response) => this.load(this.dlabingperc.id)
        );
    }
}
