import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Direcalter } from './direcalter.model';
import { DirecalterService } from './direcalter.service';

@Component({
    selector: 'jhi-direcalter-detail',
    templateUrl: './direcalter-detail.component.html'
})
export class DirecalterDetailComponent implements OnInit, OnDestroy {

    direcalter: Direcalter;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private direcalterService: DirecalterService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDirecalters();
    }

    load(id) {
        this.direcalterService.find(id).subscribe((direcalter) => {
            this.direcalter = direcalter;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDirecalters() {
        this.eventSubscriber = this.eventManager.subscribe(
            'direcalterListModification',
            (response) => this.load(this.direcalter.id)
        );
    }
}
