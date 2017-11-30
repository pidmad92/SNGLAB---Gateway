import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Ambitoorgan } from './ambitoorgan.model';
import { AmbitoorganService } from './ambitoorgan.service';

@Component({
    selector: 'jhi-ambitoorgan-detail',
    templateUrl: './ambitoorgan-detail.component.html'
})
export class AmbitoorganDetailComponent implements OnInit, OnDestroy {

    ambitoorgan: Ambitoorgan;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private ambitoorganService: AmbitoorganService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAmbitoorgans();
    }

    load(id) {
        this.ambitoorganService.find(id).subscribe((ambitoorgan) => {
            this.ambitoorgan = ambitoorgan;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAmbitoorgans() {
        this.eventSubscriber = this.eventManager.subscribe(
            'ambitoorganListModification',
            (response) => this.load(this.ambitoorgan.id)
        );
    }
}
