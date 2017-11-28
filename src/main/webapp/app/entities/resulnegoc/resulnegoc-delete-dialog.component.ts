import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Resulnegoc } from './resulnegoc.model';
import { ResulnegocPopupService } from './resulnegoc-popup.service';
import { ResulnegocService } from './resulnegoc.service';

@Component({
    selector: 'jhi-resulnegoc-delete-dialog',
    templateUrl: './resulnegoc-delete-dialog.component.html'
})
export class ResulnegocDeleteDialogComponent {

    resulnegoc: Resulnegoc;

    constructor(
        private resulnegocService: ResulnegocService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.resulnegocService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'resulnegocListModification',
                content: 'Deleted an resulnegoc'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-resulnegoc-delete-popup',
    template: ''
})
export class ResulnegocDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private resulnegocPopupService: ResulnegocPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.resulnegocPopupService
                .open(ResulnegocDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
