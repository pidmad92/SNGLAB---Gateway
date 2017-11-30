import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Legtipdoc } from './legtipdoc.model';
import { LegtipdocService } from './legtipdoc.service';

@Component({
    selector: 'jhi-legtipdoc-detail',
    templateUrl: './legtipdoc-detail.component.html'
})
export class LegtipdocDetailComponent implements OnInit, OnDestroy {

    legtipdoc: Legtipdoc;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private legtipdocService: LegtipdocService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInLegtipdocs();
    }

    load(id) {
        this.legtipdocService.find(id).subscribe((legtipdoc) => {
            this.legtipdoc = legtipdoc;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInLegtipdocs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'legtipdocListModification',
            (response) => this.load(this.legtipdoc.id)
        );
    }
}
