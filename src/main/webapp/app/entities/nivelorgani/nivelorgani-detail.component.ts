import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Nivelorgani } from './nivelorgani.model';
import { NivelorganiService } from './nivelorgani.service';

@Component({
    selector: 'jhi-nivelorgani-detail',
    templateUrl: './nivelorgani-detail.component.html'
})
export class NivelorganiDetailComponent implements OnInit, OnDestroy {

    nivelorgani: Nivelorgani;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private nivelorganiService: NivelorganiService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInNivelorganis();
    }

    load(id) {
        this.nivelorganiService.find(id).subscribe((nivelorgani) => {
            this.nivelorgani = nivelorgani;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInNivelorganis() {
        this.eventSubscriber = this.eventManager.subscribe(
            'nivelorganiListModification',
            (response) => this.load(this.nivelorgani.id)
        );
    }
}
