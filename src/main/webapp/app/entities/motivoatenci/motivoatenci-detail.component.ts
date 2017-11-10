import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Motivoatenci } from './motivoatenci.model';
import { MotivoatenciService } from './motivoatenci.service';

@Component({
    selector: 'jhi-motivoatenci-detail',
    templateUrl: './motivoatenci-detail.component.html'
})
export class MotivoatenciDetailComponent implements OnInit, OnDestroy {

    motivoatenci: Motivoatenci;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private motivoatenciService: MotivoatenciService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMotivoatencis();
    }

    load(id) {
        this.motivoatenciService.find(id).subscribe((motivoatenci) => {
            this.motivoatenci = motivoatenci;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMotivoatencis() {
        this.eventSubscriber = this.eventManager.subscribe(
            'motivoatenciListModification',
            (response) => this.load(this.motivoatenci.id)
        );
    }
}
