import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Motfin } from './motfin.model';
import { MotfinService } from './motfin.service';

@Component({
    selector: 'jhi-motfin-detail',
    templateUrl: './motfin-detail.component.html'
})
export class MotfinDetailComponent implements OnInit, OnDestroy {

    motfin: Motfin;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private motfinService: MotfinService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMotfins();
    }

    load(id) {
        this.motfinService.find(id).subscribe((motfin) => {
            this.motfin = motfin;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMotfins() {
        this.eventSubscriber = this.eventManager.subscribe(
            'motfinListModification',
            (response) => this.load(this.motfin.id)
        );
    }
}
