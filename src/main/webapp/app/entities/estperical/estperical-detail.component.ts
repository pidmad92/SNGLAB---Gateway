import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Estperical } from './estperical.model';
import { EstpericalService } from './estperical.service';

@Component({
    selector: 'jhi-estperical-detail',
    templateUrl: './estperical-detail.component.html'
})
export class EstpericalDetailComponent implements OnInit, OnDestroy {

    estperical: Estperical;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private estpericalService: EstpericalService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEstpericals();
    }

    load(id) {
        this.estpericalService.find(id).subscribe((estperical) => {
            this.estperical = estperical;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEstpericals() {
        this.eventSubscriber = this.eventManager.subscribe(
            'estpericalListModification',
            (response) => this.load(this.estperical.id)
        );
    }
}
