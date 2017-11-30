import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Palabraclav } from './palabraclav.model';
import { PalabraclavService } from './palabraclav.service';

@Component({
    selector: 'jhi-palabraclav-detail',
    templateUrl: './palabraclav-detail.component.html'
})
export class PalabraclavDetailComponent implements OnInit, OnDestroy {

    palabraclav: Palabraclav;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private palabraclavService: PalabraclavService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPalabraclavs();
    }

    load(id) {
        this.palabraclavService.find(id).subscribe((palabraclav) => {
            this.palabraclav = palabraclav;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPalabraclavs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'palabraclavListModification',
            (response) => this.load(this.palabraclav.id)
        );
    }
}
