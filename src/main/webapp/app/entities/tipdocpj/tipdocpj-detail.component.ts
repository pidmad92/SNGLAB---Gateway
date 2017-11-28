import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Tipdocpj } from './tipdocpj.model';
import { TipdocpjService } from './tipdocpj.service';

@Component({
    selector: 'jhi-tipdocpj-detail',
    templateUrl: './tipdocpj-detail.component.html'
})
export class TipdocpjDetailComponent implements OnInit, OnDestroy {

    tipdocpj: Tipdocpj;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tipdocpjService: TipdocpjService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTipdocpjs();
    }

    load(id) {
        this.tipdocpjService.find(id).subscribe((tipdocpj) => {
            this.tipdocpj = tipdocpj;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTipdocpjs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tipdocpjListModification',
            (response) => this.load(this.tipdocpj.id)
        );
    }
}
