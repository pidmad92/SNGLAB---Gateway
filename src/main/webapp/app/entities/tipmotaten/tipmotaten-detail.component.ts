import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Tipmotaten } from './tipmotaten.model';
import { TipmotatenService } from './tipmotaten.service';

@Component({
    selector: 'jhi-tipmotaten-detail',
    templateUrl: './tipmotaten-detail.component.html'
})
export class TipmotatenDetailComponent implements OnInit, OnDestroy {

    tipmotaten: Tipmotaten;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tipmotatenService: TipmotatenService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTipmotatens();
    }

    load(id) {
        this.tipmotatenService.find(id).subscribe((tipmotaten) => {
            this.tipmotaten = tipmotaten;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTipmotatens() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tipmotatenListModification',
            (response) => this.load(this.tipmotaten.id)
        );
    }
}
