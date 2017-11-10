import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Estexpedien } from './estexpedien.model';
import { EstexpedienService } from './estexpedien.service';

@Component({
    selector: 'jhi-estexpedien-detail',
    templateUrl: './estexpedien-detail.component.html'
})
export class EstexpedienDetailComponent implements OnInit, OnDestroy {

    estexpedien: Estexpedien;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private estexpedienService: EstexpedienService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEstexpediens();
    }

    load(id) {
        this.estexpedienService.find(id).subscribe((estexpedien) => {
            this.estexpedien = estexpedien;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEstexpediens() {
        this.eventSubscriber = this.eventManager.subscribe(
            'estexpedienListModification',
            (response) => this.load(this.estexpedien.id)
        );
    }
}
