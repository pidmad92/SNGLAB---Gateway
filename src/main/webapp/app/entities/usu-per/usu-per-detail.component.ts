import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { UsuPer } from './usu-per.model';
import { UsuPerService } from './usu-per.service';

@Component({
    selector: 'jhi-usu-per-detail',
    templateUrl: './usu-per-detail.component.html'
})
export class UsuPerDetailComponent implements OnInit, OnDestroy {

    usuPer: UsuPer;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private usuPerService: UsuPerService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInUsuPers();
    }

    load(id) {
        this.usuPerService.find(id).subscribe((usuPer) => {
            this.usuPer = usuPer;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInUsuPers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'usuPerListModification',
            (response) => this.load(this.usuPer.id)
        );
    }
}
