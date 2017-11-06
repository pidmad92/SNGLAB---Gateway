import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Perjuridire } from './perjuridire.model';
import { PerjuridireService } from './perjuridire.service';

@Component({
    selector: 'jhi-perjuridire-detail',
    templateUrl: './perjuridire-detail.component.html'
})
export class PerjuridireDetailComponent implements OnInit, OnDestroy {

    perjuridire: Perjuridire;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private perjuridireService: PerjuridireService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPerjuridires();
    }

    load(id) {
        this.perjuridireService.find(id).subscribe((perjuridire) => {
            this.perjuridire = perjuridire;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPerjuridires() {
        this.eventSubscriber = this.eventManager.subscribe(
            'perjuridireListModification',
            (response) => this.load(this.perjuridire.id)
        );
    }
}
