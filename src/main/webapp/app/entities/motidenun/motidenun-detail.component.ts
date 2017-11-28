import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Motidenun } from './motidenun.model';
import { MotidenunService } from './motidenun.service';

@Component({
    selector: 'jhi-motidenun-detail',
    templateUrl: './motidenun-detail.component.html'
})
export class MotidenunDetailComponent implements OnInit, OnDestroy {

    motidenun: Motidenun;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private motidenunService: MotidenunService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMotidenuns();
    }

    load(id) {
        this.motidenunService.find(id).subscribe((motidenun) => {
            this.motidenun = motidenun;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMotidenuns() {
        this.eventSubscriber = this.eventManager.subscribe(
            'motidenunListModification',
            (response) => this.load(this.motidenun.id)
        );
    }
}
