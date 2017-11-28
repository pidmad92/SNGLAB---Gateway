import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Segsalud } from './segsalud.model';
import { SegsaludService } from './segsalud.service';

@Component({
    selector: 'jhi-segsalud-detail',
    templateUrl: './segsalud-detail.component.html'
})
export class SegsaludDetailComponent implements OnInit, OnDestroy {

    segsalud: Segsalud;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private segsaludService: SegsaludService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSegsaluds();
    }

    load(id) {
        this.segsaludService.find(id).subscribe((segsalud) => {
            this.segsalud = segsalud;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSegsaluds() {
        this.eventSubscriber = this.eventManager.subscribe(
            'segsaludListModification',
            (response) => this.load(this.segsalud.id)
        );
    }
}
