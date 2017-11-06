import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Grupo } from './grupo.model';
import { GrupoService } from './grupo.service';

@Component({
    selector: 'jhi-grupo-detail',
    templateUrl: './grupo-detail.component.html'
})
export class GrupoDetailComponent implements OnInit, OnDestroy {

    grupo: Grupo;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private grupoService: GrupoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInGrupos();
    }

    load(id) {
        this.grupoService.find(id).subscribe((grupo) => {
            this.grupo = grupo;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInGrupos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'grupoListModification',
            (response) => this.load(this.grupo.id)
        );
    }
}
