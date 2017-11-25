import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Hechoinver } from './hechoinver.model';
import { HechoinverService } from './hechoinver.service';

@Component({
    selector: 'jhi-hechoinver-detail',
    templateUrl: './hechoinver-detail.component.html'
})
export class HechoinverDetailComponent implements OnInit, OnDestroy {

    hechoinver: Hechoinver;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private hechoinverService: HechoinverService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInHechoinvers();
    }

    load(id) {
        this.hechoinverService.find(id).subscribe((hechoinver) => {
            this.hechoinver = hechoinver;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInHechoinvers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'hechoinverListModification',
            (response) => this.load(this.hechoinver.id)
        );
    }
}
