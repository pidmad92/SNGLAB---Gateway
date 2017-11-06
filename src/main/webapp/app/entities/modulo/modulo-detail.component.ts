import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Modulo } from './modulo.model';
import { ModuloService } from './modulo.service';

@Component({
    selector: 'jhi-modulo-detail',
    templateUrl: './modulo-detail.component.html'
})
export class ModuloDetailComponent implements OnInit, OnDestroy {

    modulo: Modulo;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private moduloService: ModuloService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInModulos();
    }

    load(id) {
        this.moduloService.find(id).subscribe((modulo) => {
            this.modulo = modulo;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInModulos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'moduloListModification',
            (response) => this.load(this.modulo.id)
        );
    }
}
