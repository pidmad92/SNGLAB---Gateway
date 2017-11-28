import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Tipconrem } from './tipconrem.model';
import { TipconremService } from './tipconrem.service';

@Component({
    selector: 'jhi-tipconrem-detail',
    templateUrl: './tipconrem-detail.component.html'
})
export class TipconremDetailComponent implements OnInit, OnDestroy {

    tipconrem: Tipconrem;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tipconremService: TipconremService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTipconrems();
    }

    load(id) {
        this.tipconremService.find(id).subscribe((tipconrem) => {
            this.tipconrem = tipconrem;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTipconrems() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tipconremListModification',
            (response) => this.load(this.tipconrem.id)
        );
    }
}
