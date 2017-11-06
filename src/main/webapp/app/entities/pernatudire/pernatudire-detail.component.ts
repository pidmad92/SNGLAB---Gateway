import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Pernatudire } from './pernatudire.model';
import { PernatudireService } from './pernatudire.service';

@Component({
    selector: 'jhi-pernatudire-detail',
    templateUrl: './pernatudire-detail.component.html'
})
export class PernatudireDetailComponent implements OnInit, OnDestroy {

    pernatudire: Pernatudire;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private pernatudireService: PernatudireService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPernatudires();
    }

    load(id) {
        this.pernatudireService.find(id).subscribe((pernatudire) => {
            this.pernatudire = pernatudire;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPernatudires() {
        this.eventSubscriber = this.eventManager.subscribe(
            'pernatudireListModification',
            (response) => this.load(this.pernatudire.id)
        );
    }
}
