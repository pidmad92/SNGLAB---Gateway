import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Tipdocumento } from './tipdocumento.model';
import { TipdocumentoService } from './tipdocumento.service';

@Component({
    selector: 'jhi-tipdocumento-detail',
    templateUrl: './tipdocumento-detail.component.html'
})
export class TipdocumentoDetailComponent implements OnInit, OnDestroy {

    tipdocumento: Tipdocumento;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tipdocumentoService: TipdocumentoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTipdocumentos();
    }

    load(id) {
        this.tipdocumentoService.find(id).subscribe((tipdocumento) => {
            this.tipdocumento = tipdocumento;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTipdocumentos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tipdocumentoListModification',
            (response) => this.load(this.tipdocumento.id)
        );
    }
}
