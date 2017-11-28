import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Tipcalconre } from './tipcalconre.model';
import { TipcalconreService } from './tipcalconre.service';

@Component({
    selector: 'jhi-tipcalconre-detail',
    templateUrl: './tipcalconre-detail.component.html'
})
export class TipcalconreDetailComponent implements OnInit, OnDestroy {

    tipcalconre: Tipcalconre;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tipcalconreService: TipcalconreService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTipcalconres();
    }

    load(id) {
        this.tipcalconreService.find(id).subscribe((tipcalconre) => {
            this.tipcalconre = tipcalconre;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTipcalconres() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tipcalconreListModification',
            (response) => this.load(this.tipcalconre.id)
        );
    }
}
