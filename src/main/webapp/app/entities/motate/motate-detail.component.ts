import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Motate } from './motate.model';
import { MotateService } from './motate.service';

@Component({
    selector: 'jhi-motate-detail',
    templateUrl: './motate-detail.component.html'
})
export class MotateDetailComponent implements OnInit, OnDestroy {

    motate: Motate;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private motateService: MotateService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMotates();
    }

    load(id) {
        this.motateService.find(id).subscribe((motate) => {
            this.motate = motate;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMotates() {
        this.eventSubscriber = this.eventManager.subscribe(
            'motateListModification',
            (response) => this.load(this.motate.id)
        );
    }
}
