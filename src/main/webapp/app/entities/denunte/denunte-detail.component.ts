import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Denunte } from './denunte.model';
import { DenunteService } from './denunte.service';

@Component({
    selector: 'jhi-denunte-detail',
    templateUrl: './denunte-detail.component.html'
})
export class DenunteDetailComponent implements OnInit, OnDestroy {

    denunte: Denunte;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private denunteService: DenunteService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDenuntes();
    }

    load(id) {
        this.denunteService.find(id).subscribe((denunte) => {
            this.denunte = denunte;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDenuntes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'denunteListModification',
            (response) => this.load(this.denunte.id)
        );
    }
}
