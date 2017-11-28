import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Calbensoc } from './calbensoc.model';
import { CalbensocService } from './calbensoc.service';

@Component({
    selector: 'jhi-calbensoc-detail',
    templateUrl: './calbensoc-detail.component.html'
})
export class CalbensocDetailComponent implements OnInit, OnDestroy {

    calbensoc: Calbensoc;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private calbensocService: CalbensocService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCalbensocs();
    }

    load(id) {
        this.calbensocService.find(id).subscribe((calbensoc) => {
            this.calbensoc = calbensoc;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCalbensocs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'calbensocListModification',
            (response) => this.load(this.calbensoc.id)
        );
    }
}
