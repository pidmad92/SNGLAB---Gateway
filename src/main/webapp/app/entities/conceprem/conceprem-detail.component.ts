import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Conceprem } from './conceprem.model';
import { ConcepremService } from './conceprem.service';

@Component({
    selector: 'jhi-conceprem-detail',
    templateUrl: './conceprem-detail.component.html'
})
export class ConcepremDetailComponent implements OnInit, OnDestroy {

    conceprem: Conceprem;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private concepremService: ConcepremService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInConceprems();
    }

    load(id) {
        this.concepremService.find(id).subscribe((conceprem) => {
            this.conceprem = conceprem;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInConceprems() {
        this.eventSubscriber = this.eventManager.subscribe(
            'concepremListModification',
            (response) => this.load(this.conceprem.id)
        );
    }
}
