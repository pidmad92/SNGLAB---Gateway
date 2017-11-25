import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Tipcalperi } from './tipcalperi.model';
import { TipcalperiService } from './tipcalperi.service';

@Component({
    selector: 'jhi-tipcalperi-detail',
    templateUrl: './tipcalperi-detail.component.html'
})
export class TipcalperiDetailComponent implements OnInit, OnDestroy {

    tipcalperi: Tipcalperi;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tipcalperiService: TipcalperiService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTipcalperis();
    }

    load(id) {
        this.tipcalperiService.find(id).subscribe((tipcalperi) => {
            this.tipcalperi = tipcalperi;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTipcalperis() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tipcalperiListModification',
            (response) => this.load(this.tipcalperi.id)
        );
    }
}
