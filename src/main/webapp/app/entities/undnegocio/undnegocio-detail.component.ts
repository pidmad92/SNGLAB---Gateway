import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Undnegocio } from './undnegocio.model';
import { UndnegocioService } from './undnegocio.service';

@Component({
    selector: 'jhi-undnegocio-detail',
    templateUrl: './undnegocio-detail.component.html'
})
export class UndnegocioDetailComponent implements OnInit, OnDestroy {

    undnegocio: Undnegocio;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private undnegocioService: UndnegocioService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInUndnegocios();
    }

    load(id) {
        this.undnegocioService.find(id).subscribe((undnegocio) => {
            this.undnegocio = undnegocio;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInUndnegocios() {
        this.eventSubscriber = this.eventManager.subscribe(
            'undnegocioListModification',
            (response) => this.load(this.undnegocio.id)
        );
    }
}
