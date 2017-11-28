import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Pasepj } from './pasepj.model';
import { PasepjService } from './pasepj.service';

@Component({
    selector: 'jhi-pasepj-detail',
    templateUrl: './pasepj-detail.component.html'
})
export class PasepjDetailComponent implements OnInit, OnDestroy {

    pasepj: Pasepj;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private pasepjService: PasepjService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPasepjs();
    }

    load(id) {
        this.pasepjService.find(id).subscribe((pasepj) => {
            this.pasepj = pasepj;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPasepjs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'pasepjListModification',
            (response) => this.load(this.pasepj.id)
        );
    }
}
