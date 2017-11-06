import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Documento } from './documento.model';
import { DocumentoService } from './documento.service';

@Component({
    selector: 'jhi-documento-detail',
    templateUrl: './documento-detail.component.html'
})
export class DocumentoDetailComponent implements OnInit, OnDestroy {

    documento: Documento;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private documentoService: DocumentoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDocumentos();
    }

    load(id) {
        this.documentoService.find(id).subscribe((documento) => {
            this.documento = documento;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDocumentos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'documentoListModification',
            (response) => this.load(this.documento.id)
        );
    }
}
