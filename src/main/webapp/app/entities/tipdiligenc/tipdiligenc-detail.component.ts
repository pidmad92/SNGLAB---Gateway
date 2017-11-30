import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Tipdiligenc } from './tipdiligenc.model';
import { TipdiligencService } from './tipdiligenc.service';

@Component({
    selector: 'jhi-tipdiligenc-detail',
    templateUrl: './tipdiligenc-detail.component.html'
})
export class TipdiligencDetailComponent implements OnInit, OnDestroy {

    tipdiligenc: Tipdiligenc;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tipdiligencService: TipdiligencService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTipdiligencs();
    }

    load(id) {
        this.tipdiligencService.find(id).subscribe((tipdiligenc) => {
            this.tipdiligenc = tipdiligenc;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTipdiligencs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tipdiligencListModification',
            (response) => this.load(this.tipdiligenc.id)
        );
    }
}
