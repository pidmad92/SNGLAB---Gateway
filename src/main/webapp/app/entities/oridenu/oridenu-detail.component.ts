import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Oridenu } from './oridenu.model';
import { OridenuService } from './oridenu.service';

@Component({
    selector: 'jhi-oridenu-detail',
    templateUrl: './oridenu-detail.component.html'
})
export class OridenuDetailComponent implements OnInit, OnDestroy {

    oridenu: Oridenu;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private oridenuService: OridenuService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInOridenus();
    }

    load(id) {
        this.oridenuService.find(id).subscribe((oridenu) => {
            this.oridenu = oridenu;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInOridenus() {
        this.eventSubscriber = this.eventManager.subscribe(
            'oridenuListModification',
            (response) => this.load(this.oridenu.id)
        );
    }
}
