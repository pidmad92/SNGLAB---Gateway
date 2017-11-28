import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Resulnegoc } from './resulnegoc.model';
import { ResulnegocService } from './resulnegoc.service';

@Component({
    selector: 'jhi-resulnegoc-detail',
    templateUrl: './resulnegoc-detail.component.html'
})
export class ResulnegocDetailComponent implements OnInit, OnDestroy {

    resulnegoc: Resulnegoc;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private resulnegocService: ResulnegocService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInResulnegocs();
    }

    load(id) {
        this.resulnegocService.find(id).subscribe((resulnegoc) => {
            this.resulnegoc = resulnegoc;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInResulnegocs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'resulnegocListModification',
            (response) => this.load(this.resulnegoc.id)
        );
    }
}
