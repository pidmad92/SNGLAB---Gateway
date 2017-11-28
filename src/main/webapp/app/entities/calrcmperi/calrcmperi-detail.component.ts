import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Calrcmperi } from './calrcmperi.model';
import { CalrcmperiService } from './calrcmperi.service';

@Component({
    selector: 'jhi-calrcmperi-detail',
    templateUrl: './calrcmperi-detail.component.html'
})
export class CalrcmperiDetailComponent implements OnInit, OnDestroy {

    calrcmperi: Calrcmperi;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private calrcmperiService: CalrcmperiService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCalrcmperis();
    }

    load(id) {
        this.calrcmperiService.find(id).subscribe((calrcmperi) => {
            this.calrcmperi = calrcmperi;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCalrcmperis() {
        this.eventSubscriber = this.eventManager.subscribe(
            'calrcmperiListModification',
            (response) => this.load(this.calrcmperi.id)
        );
    }
}
