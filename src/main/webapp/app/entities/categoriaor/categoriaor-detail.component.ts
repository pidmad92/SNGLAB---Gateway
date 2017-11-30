import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Categoriaor } from './categoriaor.model';
import { CategoriaorService } from './categoriaor.service';

@Component({
    selector: 'jhi-categoriaor-detail',
    templateUrl: './categoriaor-detail.component.html'
})
export class CategoriaorDetailComponent implements OnInit, OnDestroy {

    categoriaor: Categoriaor;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private categoriaorService: CategoriaorService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCategoriaors();
    }

    load(id) {
        this.categoriaorService.find(id).subscribe((categoriaor) => {
            this.categoriaor = categoriaor;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCategoriaors() {
        this.eventSubscriber = this.eventManager.subscribe(
            'categoriaorListModification',
            (response) => this.load(this.categoriaor.id)
        );
    }
}
