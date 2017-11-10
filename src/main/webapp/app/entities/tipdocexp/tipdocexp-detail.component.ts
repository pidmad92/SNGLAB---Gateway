import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Tipdocexp } from './tipdocexp.model';
import { TipdocexpService } from './tipdocexp.service';

@Component({
    selector: 'jhi-tipdocexp-detail',
    templateUrl: './tipdocexp-detail.component.html'
})
export class TipdocexpDetailComponent implements OnInit, OnDestroy {

    tipdocexp: Tipdocexp;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tipdocexpService: TipdocexpService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTipdocexps();
    }

    load(id) {
        this.tipdocexpService.find(id).subscribe((tipdocexp) => {
            this.tipdocexp = tipdocexp;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTipdocexps() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tipdocexpListModification',
            (response) => this.load(this.tipdocexp.id)
        );
    }
}
