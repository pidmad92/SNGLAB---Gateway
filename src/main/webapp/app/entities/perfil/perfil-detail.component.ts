import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Perfil } from './perfil.model';
import { PerfilService } from './perfil.service';

@Component({
    selector: 'jhi-perfil-detail',
    templateUrl: './perfil-detail.component.html'
})
export class PerfilDetailComponent implements OnInit, OnDestroy {

    perfil: Perfil;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private perfilService: PerfilService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPerfils();
    }

    load(id) {
        this.perfilService.find(id).subscribe((perfil) => {
            this.perfil = perfil;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPerfils() {
        this.eventSubscriber = this.eventManager.subscribe(
            'perfilListModification',
            (response) => this.load(this.perfil.id)
        );
    }
}
