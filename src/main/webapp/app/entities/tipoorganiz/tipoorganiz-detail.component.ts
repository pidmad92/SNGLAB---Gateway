import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Tipoorganiz } from './tipoorganiz.model';
import { TipoorganizService } from './tipoorganiz.service';

@Component({
    selector: 'jhi-tipoorganiz-detail',
    templateUrl: './tipoorganiz-detail.component.html'
})
export class TipoorganizDetailComponent implements OnInit, OnDestroy {

    tipoorganiz: Tipoorganiz;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tipoorganizService: TipoorganizService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTipoorganizs();
    }

    load(id) {
        this.tipoorganizService.find(id).subscribe((tipoorganiz) => {
            this.tipoorganiz = tipoorganiz;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTipoorganizs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tipoorganizListModification',
            (response) => this.load(this.tipoorganiz.id)
        );
    }
}
