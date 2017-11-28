import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Denuncia } from './denuncia.model';
import { DenunciaService } from './denuncia.service';

@Component({
    selector: 'jhi-denuncia-detail',
    templateUrl: './denuncia-detail.component.html'
})
export class DenunciaDetailComponent implements OnInit, OnDestroy {

    denuncia: Denuncia;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private denunciaService: DenunciaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDenuncias();
    }

    load(id) {
        this.denunciaService.find(id).subscribe((denuncia) => {
            this.denuncia = denuncia;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDenuncias() {
        this.eventSubscriber = this.eventManager.subscribe(
            'denunciaListModification',
            (response) => this.load(this.denuncia.id)
        );
    }
}
