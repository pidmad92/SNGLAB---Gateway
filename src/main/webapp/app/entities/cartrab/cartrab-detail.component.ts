import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Cartrab } from './cartrab.model';
import { CartrabService } from './cartrab.service';

@Component({
    selector: 'jhi-cartrab-detail',
    templateUrl: './cartrab-detail.component.html'
})
export class CartrabDetailComponent implements OnInit, OnDestroy {

    cartrab: Cartrab;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private cartrabService: CartrabService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCartrabs();
    }

    load(id) {
        this.cartrabService.find(id).subscribe((cartrab) => {
            this.cartrab = cartrab;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCartrabs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'cartrabListModification',
            (response) => this.load(this.cartrab.id)
        );
    }
}
