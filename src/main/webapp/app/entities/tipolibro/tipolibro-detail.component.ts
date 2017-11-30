import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Tipolibro } from './tipolibro.model';
import { TipolibroService } from './tipolibro.service';

@Component({
    selector: 'jhi-tipolibro-detail',
    templateUrl: './tipolibro-detail.component.html'
})
export class TipolibroDetailComponent implements OnInit, OnDestroy {

    tipolibro: Tipolibro;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tipolibroService: TipolibroService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTipolibros();
    }

    load(id) {
        this.tipolibroService.find(id).subscribe((tipolibro) => {
            this.tipolibro = tipolibro;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTipolibros() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tipolibroListModification',
            (response) => this.load(this.tipolibro.id)
        );
    }
}
