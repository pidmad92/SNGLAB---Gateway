import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Regimenlabo } from './regimenlabo.model';
import { RegimenlaboService } from './regimenlabo.service';

@Component({
    selector: 'jhi-regimenlabo-detail',
    templateUrl: './regimenlabo-detail.component.html'
})
export class RegimenlaboDetailComponent implements OnInit, OnDestroy {

    regimenlabo: Regimenlabo;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private regimenlaboService: RegimenlaboService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRegimenlabos();
    }

    load(id) {
        this.regimenlaboService.find(id).subscribe((regimenlabo) => {
            this.regimenlabo = regimenlabo;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRegimenlabos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'regimenlaboListModification',
            (response) => this.load(this.regimenlabo.id)
        );
    }
}
