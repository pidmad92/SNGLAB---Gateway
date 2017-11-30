import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Legajo } from './legajo.model';
import { LegajoService } from './legajo.service';

@Component({
    selector: 'jhi-legajo-detail',
    templateUrl: './legajo-detail.component.html'
})
export class LegajoDetailComponent implements OnInit, OnDestroy {

    legajo: Legajo;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private legajoService: LegajoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInLegajos();
    }

    load(id) {
        this.legajoService.find(id).subscribe((legajo) => {
            this.legajo = legajo;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInLegajos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'legajoListModification',
            (response) => this.load(this.legajo.id)
        );
    }
}
