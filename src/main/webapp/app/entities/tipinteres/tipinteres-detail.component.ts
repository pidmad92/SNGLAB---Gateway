import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Tipinteres } from './tipinteres.model';
import { TipinteresService } from './tipinteres.service';

@Component({
    selector: 'jhi-tipinteres-detail',
    templateUrl: './tipinteres-detail.component.html'
})
export class TipinteresDetailComponent implements OnInit, OnDestroy {

    tipinteres: Tipinteres;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tipinteresService: TipinteresService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTipinteres();
    }

    load(id) {
        this.tipinteresService.find(id).subscribe((tipinteres) => {
            this.tipinteres = tipinteres;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTipinteres() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tipinteresListModification',
            (response) => this.load(this.tipinteres.id)
        );
    }
}
