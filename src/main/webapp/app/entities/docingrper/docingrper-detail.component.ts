import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Docingrper } from './docingrper.model';
import { DocingrperService } from './docingrper.service';

@Component({
    selector: 'jhi-docingrper-detail',
    templateUrl: './docingrper-detail.component.html'
})
export class DocingrperDetailComponent implements OnInit, OnDestroy {

    docingrper: Docingrper;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private docingrperService: DocingrperService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDocingrpers();
    }

    load(id) {
        this.docingrperService.find(id).subscribe((docingrper) => {
            this.docingrper = docingrper;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDocingrpers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'docingrperListModification',
            (response) => this.load(this.docingrper.id)
        );
    }
}
