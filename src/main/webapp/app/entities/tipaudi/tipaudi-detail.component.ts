import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Tipaudi } from './tipaudi.model';
import { TipaudiService } from './tipaudi.service';

@Component({
    selector: 'jhi-tipaudi-detail',
    templateUrl: './tipaudi-detail.component.html'
})
export class TipaudiDetailComponent implements OnInit, OnDestroy {

    tipaudi: Tipaudi;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tipaudiService: TipaudiService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTipaudis();
    }

    load(id) {
        this.tipaudiService.find(id).subscribe((tipaudi) => {
            this.tipaudi = tipaudi;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTipaudis() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tipaudiListModification',
            (response) => this.load(this.tipaudi.id)
        );
    }
}
