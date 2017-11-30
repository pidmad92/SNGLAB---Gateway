import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Atencionpj } from './atencionpj.model';
import { AtencionpjService } from './atencionpj.service';

@Component({
    selector: 'jhi-atencionpj-detail',
    templateUrl: './atencionpj-detail.component.html'
})
export class AtencionpjDetailComponent implements OnInit, OnDestroy {

    atencionpj: Atencionpj;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private atencionpjService: AtencionpjService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAtencionpjs();
    }

    load(id) {
        this.atencionpjService.find(id).subscribe((atencionpj) => {
            this.atencionpj = atencionpj;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAtencionpjs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'atencionpjListModification',
            (response) => this.load(this.atencionpj.id)
        );
    }
}
