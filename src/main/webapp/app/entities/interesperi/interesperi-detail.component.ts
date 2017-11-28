import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Interesperi } from './interesperi.model';
import { InteresperiService } from './interesperi.service';

@Component({
    selector: 'jhi-interesperi-detail',
    templateUrl: './interesperi-detail.component.html'
})
export class InteresperiDetailComponent implements OnInit, OnDestroy {

    interesperi: Interesperi;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private interesperiService: InteresperiService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInInteresperis();
    }

    load(id) {
        this.interesperiService.find(id).subscribe((interesperi) => {
            this.interesperi = interesperi;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInInteresperis() {
        this.eventSubscriber = this.eventManager.subscribe(
            'interesperiListModification',
            (response) => this.load(this.interesperi.id)
        );
    }
}
