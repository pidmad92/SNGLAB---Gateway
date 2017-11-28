import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Tipzona } from './tipzona.model';
import { TipzonaService } from './tipzona.service';

@Component({
    selector: 'jhi-tipzona-detail',
    templateUrl: './tipzona-detail.component.html'
})
export class TipzonaDetailComponent implements OnInit, OnDestroy {

    tipzona: Tipzona;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tipzonaService: TipzonaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTipzonas();
    }

    load(id) {
        this.tipzonaService.find(id).subscribe((tipzona) => {
            this.tipzona = tipzona;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTipzonas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tipzonaListModification',
            (response) => this.load(this.tipzona.id)
        );
    }
}
