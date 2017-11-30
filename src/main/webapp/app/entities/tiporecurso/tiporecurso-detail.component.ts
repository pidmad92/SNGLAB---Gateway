import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Tiporecurso } from './tiporecurso.model';
import { TiporecursoService } from './tiporecurso.service';

@Component({
    selector: 'jhi-tiporecurso-detail',
    templateUrl: './tiporecurso-detail.component.html'
})
export class TiporecursoDetailComponent implements OnInit, OnDestroy {

    tiporecurso: Tiporecurso;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tiporecursoService: TiporecursoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTiporecursos();
    }

    load(id) {
        this.tiporecursoService.find(id).subscribe((tiporecurso) => {
            this.tiporecurso = tiporecurso;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTiporecursos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tiporecursoListModification',
            (response) => this.load(this.tiporecurso.id)
        );
    }
}
