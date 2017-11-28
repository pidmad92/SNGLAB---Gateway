import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Calperiodo } from './calperiodo.model';
import { CalperiodoService } from './calperiodo.service';

@Component({
    selector: 'jhi-calperiodo-detail',
    templateUrl: './calperiodo-detail.component.html'
})
export class CalperiodoDetailComponent implements OnInit, OnDestroy {

    calperiodo: Calperiodo;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private calperiodoService: CalperiodoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCalperiodos();
    }

    load(id) {
        this.calperiodoService.find(id).subscribe((calperiodo) => {
            this.calperiodo = calperiodo;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCalperiodos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'calperiodoListModification',
            (response) => this.load(this.calperiodo.id)
        );
    }
}
