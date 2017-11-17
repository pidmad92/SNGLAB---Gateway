import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Direcnotif } from './direcnotif.model';
import { DirecnotifService } from './direcnotif.service';

@Component({
    selector: 'jhi-direcnotif-detail',
    templateUrl: './direcnotif-detail.component.html'
})
export class DirecnotifDetailComponent implements OnInit, OnDestroy {

    direcnotif: Direcnotif;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private direcnotifService: DirecnotifService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDirecnotifs();
    }

    load(id) {
        this.direcnotifService.find(id).subscribe((direcnotif) => {
            this.direcnotif = direcnotif;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDirecnotifs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'direcnotifListModification',
            (response) => this.load(this.direcnotif.id)
        );
    }
}
