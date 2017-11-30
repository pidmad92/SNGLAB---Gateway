import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Szonal } from './szonal.model';
import { SzonalService } from './szonal.service';

@Component({
    selector: 'jhi-szonal-detail',
    templateUrl: './szonal-detail.component.html'
})
export class SzonalDetailComponent implements OnInit, OnDestroy {

    szonal: Szonal;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private szonalService: SzonalService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSzonals();
    }

    load(id) {
        this.szonalService.find(id).subscribe((szonal) => {
            this.szonal = szonal;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSzonals() {
        this.eventSubscriber = this.eventManager.subscribe(
            'szonalListModification',
            (response) => this.load(this.szonal.id)
        );
    }
}
