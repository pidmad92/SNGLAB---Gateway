import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Docingreperc } from './docingreperc.model';
import { DocingrepercPopupService } from './docingreperc-popup.service';
import { DocingrepercService } from './docingreperc.service';

@Component({
    selector: 'jhi-docingreperc-delete-dialog',
    templateUrl: './docingreperc-delete-dialog.component.html'
})
export class DocingrepercDeleteDialogComponent {

    docingreperc: Docingreperc;

    constructor(
        private docingrepercService: DocingrepercService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.docingrepercService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'docingrepercListModification',
                content: 'Deleted an docingreperc'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-docingreperc-delete-popup',
    template: ''
})
export class DocingrepercDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private docingrepercPopupService: DocingrepercPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.docingrepercPopupService
                .open(DocingrepercDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
