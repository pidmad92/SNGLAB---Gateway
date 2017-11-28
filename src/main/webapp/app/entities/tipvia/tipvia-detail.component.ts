import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Tipvia } from './tipvia.model';
import { TipviaService } from './tipvia.service';

@Component({
    selector: 'jhi-tipvia-detail',
    templateUrl: './tipvia-detail.component.html'
})
export class TipviaDetailComponent implements OnInit, OnDestroy {

    tipvia: Tipvia;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tipviaService: TipviaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTipvias();
    }

    load(id) {
        this.tipviaService.find(id).subscribe((tipvia) => {
            this.tipvia = tipvia;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTipvias() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tipviaListModification',
            (response) => this.load(this.tipvia.id)
        );
    }
}
