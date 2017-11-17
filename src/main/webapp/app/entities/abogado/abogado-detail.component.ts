import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Abogado } from './abogado.model';
import { AbogadoService } from './abogado.service';

@Component({
    selector: 'jhi-abogado-detail',
    templateUrl: './abogado-detail.component.html'
})
export class AbogadoDetailComponent implements OnInit, OnDestroy {

    abogado: Abogado;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private abogadoService: AbogadoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAbogados();
    }

    load(id) {
        this.abogadoService.find(id).subscribe((abogado) => {
            this.abogado = abogado;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAbogados() {
        this.eventSubscriber = this.eventManager.subscribe(
            'abogadoListModification',
            (response) => this.load(this.abogado.id)
        );
    }
}
