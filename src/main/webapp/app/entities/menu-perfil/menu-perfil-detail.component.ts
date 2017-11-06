import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { MenuPerfil } from './menu-perfil.model';
import { MenuPerfilService } from './menu-perfil.service';

@Component({
    selector: 'jhi-menu-perfil-detail',
    templateUrl: './menu-perfil-detail.component.html'
})
export class MenuPerfilDetailComponent implements OnInit, OnDestroy {

    menuPerfil: MenuPerfil;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private menuPerfilService: MenuPerfilService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMenuPerfils();
    }

    load(id) {
        this.menuPerfilService.find(id).subscribe((menuPerfil) => {
            this.menuPerfil = menuPerfil;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMenuPerfils() {
        this.eventSubscriber = this.eventManager.subscribe(
            'menuPerfilListModification',
            (response) => this.load(this.menuPerfil.id)
        );
    }
}
