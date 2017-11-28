import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Formarchivo } from './formarchivo.model';
import { FormarchivoService } from './formarchivo.service';

@Component({
    selector: 'jhi-formarchivo-detail',
    templateUrl: './formarchivo-detail.component.html'
})
export class FormarchivoDetailComponent implements OnInit, OnDestroy {

    formarchivo: Formarchivo;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private formarchivoService: FormarchivoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInFormarchivos();
    }

    load(id) {
        this.formarchivoService.find(id).subscribe((formarchivo) => {
            this.formarchivo = formarchivo;
        });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInFormarchivos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'formarchivoListModification',
            (response) => this.load(this.formarchivo.id)
        );
    }
}
