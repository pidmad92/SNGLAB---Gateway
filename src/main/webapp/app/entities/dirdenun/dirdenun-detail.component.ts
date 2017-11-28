import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Dirdenun } from './dirdenun.model';
import { DirdenunService } from './dirdenun.service';

@Component({
    selector: 'jhi-dirdenun-detail',
    templateUrl: './dirdenun-detail.component.html'
})
export class DirdenunDetailComponent implements OnInit, OnDestroy {

    dirdenun: Dirdenun;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dirdenunService: DirdenunService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDirdenuns();
    }

    load(id) {
        this.dirdenunService.find(id).subscribe((dirdenun) => {
            this.dirdenun = dirdenun;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDirdenuns() {
        this.eventSubscriber = this.eventManager.subscribe(
            'dirdenunListModification',
            (response) => this.load(this.dirdenun.id)
        );
    }
}
