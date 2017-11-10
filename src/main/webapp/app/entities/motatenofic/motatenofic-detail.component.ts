import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Motatenofic } from './motatenofic.model';
import { MotatenoficService } from './motatenofic.service';

@Component({
    selector: 'jhi-motatenofic-detail',
    templateUrl: './motatenofic-detail.component.html'
})
export class MotatenoficDetailComponent implements OnInit, OnDestroy {

    motatenofic: Motatenofic;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private motatenoficService: MotatenoficService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMotatenofics();
    }

    load(id) {
        this.motatenoficService.find(id).subscribe((motatenofic) => {
            this.motatenofic = motatenofic;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMotatenofics() {
        this.eventSubscriber = this.eventManager.subscribe(
            'motatenoficListModification',
            (response) => this.load(this.motatenofic.id)
        );
    }
}
