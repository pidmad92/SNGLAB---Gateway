import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Tipdoc } from './tipdoc.model';
import { TipdocService } from './tipdoc.service';

@Component({
    selector: 'jhi-tipdoc-detail',
    templateUrl: './tipdoc-detail.component.html'
})
export class TipdocDetailComponent implements OnInit, OnDestroy {

    tipdoc: Tipdoc;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tipdocService: TipdocService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTipdocs();
    }

    load(id) {
        this.tipdocService.find(id).subscribe((tipdoc) => {
            this.tipdoc = tipdoc;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTipdocs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tipdocListModification',
            (response) => this.load(this.tipdoc.id)
        );
    }
}
