import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Pernatural } from './pernatural.model';
import { PernaturalService } from './pernatural.service';

@Component({
    selector: 'jhi-pernatural-detail',
    templateUrl: './pernatural-detail.component.html'
})
export class PernaturalDetailComponent implements OnInit, OnDestroy {

    pernatural: Pernatural;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private pernaturalService: PernaturalService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPernaturals();
    }

    load(id) {
        this.pernaturalService.find(id).subscribe((pernatural) => {
            this.pernatural = pernatural;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPernaturals() {
        this.eventSubscriber = this.eventManager.subscribe(
            'pernaturalListModification',
            (response) => this.load(this.pernatural.id)
        );
    }
}
