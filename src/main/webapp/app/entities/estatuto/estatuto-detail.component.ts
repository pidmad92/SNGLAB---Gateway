import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Estatuto } from './estatuto.model';
import { EstatutoService } from './estatuto.service';

@Component({
    selector: 'jhi-estatuto-detail',
    templateUrl: './estatuto-detail.component.html'
})
export class EstatutoDetailComponent implements OnInit, OnDestroy {

    estatuto: Estatuto;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private estatutoService: EstatutoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEstatutos();
    }

    load(id) {
        this.estatutoService.find(id).subscribe((estatuto) => {
            this.estatuto = estatuto;
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

    registerChangeInEstatutos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'estatutoListModification',
            (response) => this.load(this.estatuto.id)
        );
    }
}
