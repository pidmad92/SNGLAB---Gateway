import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Atenaccadop } from './atenaccadop.model';
import { AtenaccadopService } from './atenaccadop.service';

@Component({
    selector: 'jhi-atenaccadop-detail',
    templateUrl: './atenaccadop-detail.component.html'
})
export class AtenaccadopDetailComponent implements OnInit, OnDestroy {

    atenaccadop: Atenaccadop;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private atenaccadopService: AtenaccadopService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAtenaccadops();
    }

    load(id) {
        this.atenaccadopService.find(id).subscribe((atenaccadop) => {
            this.atenaccadop = atenaccadop;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAtenaccadops() {
        this.eventSubscriber = this.eventManager.subscribe(
            'atenaccadopListModification',
            (response) => this.load(this.atenaccadop.id)
        );
    }
}
