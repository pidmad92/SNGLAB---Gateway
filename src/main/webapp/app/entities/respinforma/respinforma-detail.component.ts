import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Respinforma } from './respinforma.model';
import { RespinformaService } from './respinforma.service';

@Component({
    selector: 'jhi-respinforma-detail',
    templateUrl: './respinforma-detail.component.html'
})
export class RespinformaDetailComponent implements OnInit, OnDestroy {

    respinforma: Respinforma;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private respinformaService: RespinformaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRespinformas();
    }

    load(id) {
        this.respinformaService.find(id).subscribe((respinforma) => {
            this.respinforma = respinforma;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRespinformas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'respinformaListModification',
            (response) => this.load(this.respinforma.id)
        );
    }
}
