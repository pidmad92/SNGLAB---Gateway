import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Motivocese } from './motivocese.model';
import { MotivocesePopupService } from './motivocese-popup.service';
import { MotivoceseService } from './motivocese.service';

@Component({
    selector: 'jhi-motivocese-delete-dialog',
    templateUrl: './motivocese-delete-dialog.component.html'
})
export class MotivoceseDeleteDialogComponent {

    motivocese: Motivocese;

    constructor(
        private motivoceseService: MotivoceseService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.motivoceseService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'motivoceseListModification',
                content: 'Deleted an motivocese'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-motivocese-delete-popup',
    template: ''
})
export class MotivoceseDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private motivocesePopupService: MotivocesePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.motivocesePopupService
                .open(MotivoceseDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
