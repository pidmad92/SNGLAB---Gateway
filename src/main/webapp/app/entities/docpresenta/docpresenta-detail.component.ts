import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Docpresenta } from './docpresenta.model';
import { DocpresentaService } from './docpresenta.service';

@Component({
    selector: 'jhi-docpresenta-detail',
    templateUrl: './docpresenta-detail.component.html'
})
export class DocpresentaDetailComponent implements OnInit, OnDestroy {

    docpresenta: Docpresenta;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private docpresentaService: DocpresentaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDocpresentas();
    }

    load(id) {
        this.docpresentaService.find(id).subscribe((docpresenta) => {
            this.docpresenta = docpresenta;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDocpresentas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'docpresentaListModification',
            (response) => this.load(this.docpresenta.id)
        );
    }
}
