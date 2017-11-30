import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Tipresoluc } from './tipresoluc.model';
import { TipresolucService } from './tipresoluc.service';

@Component({
    selector: 'jhi-tipresoluc-detail',
    templateUrl: './tipresoluc-detail.component.html'
})
export class TipresolucDetailComponent implements OnInit, OnDestroy {

    tipresoluc: Tipresoluc;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tipresolucService: TipresolucService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTipresolucs();
    }

    load(id) {
        this.tipresolucService.find(id).subscribe((tipresoluc) => {
            this.tipresoluc = tipresoluc;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTipresolucs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tipresolucListModification',
            (response) => this.load(this.tipresoluc.id)
        );
    }
}
