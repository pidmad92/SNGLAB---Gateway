import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Motivpase } from './motivpase.model';
import { MotivpaseService } from './motivpase.service';

@Component({
    selector: 'jhi-motivpase-detail',
    templateUrl: './motivpase-detail.component.html'
})
export class MotivpaseDetailComponent implements OnInit, OnDestroy {

    motivpase: Motivpase;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private motivpaseService: MotivpaseService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMotivpases();
    }

    load(id) {
        this.motivpaseService.find(id).subscribe((motivpase) => {
            this.motivpase = motivpase;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMotivpases() {
        this.eventSubscriber = this.eventManager.subscribe(
            'motivpaseListModification',
            (response) => this.load(this.motivpase.id)
        );
    }
}
