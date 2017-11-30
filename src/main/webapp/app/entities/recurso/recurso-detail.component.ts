import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Recurso } from './recurso.model';
import { RecursoService } from './recurso.service';

@Component({
    selector: 'jhi-recurso-detail',
    templateUrl: './recurso-detail.component.html'
})
export class RecursoDetailComponent implements OnInit, OnDestroy {

    recurso: Recurso;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private recursoService: RecursoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRecursos();
    }

    load(id) {
        this.recursoService.find(id).subscribe((recurso) => {
            this.recurso = recurso;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRecursos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'recursoListModification',
            (response) => this.load(this.recurso.id)
        );
    }
}
