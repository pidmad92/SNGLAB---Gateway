import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Falsoexp } from './falsoexp.model';
import { FalsoexpService } from './falsoexp.service';

@Component({
    selector: 'jhi-falsoexp-detail',
    templateUrl: './falsoexp-detail.component.html'
})
export class FalsoexpDetailComponent implements OnInit, OnDestroy {

    falsoexp: Falsoexp;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private falsoexpService: FalsoexpService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInFalsoexps();
    }

    load(id) {
        this.falsoexpService.find(id).subscribe((falsoexp) => {
            this.falsoexp = falsoexp;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInFalsoexps() {
        this.eventSubscriber = this.eventManager.subscribe(
            'falsoexpListModification',
            (response) => this.load(this.falsoexp.id)
        );
    }
}
