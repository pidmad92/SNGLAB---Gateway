import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { TipoUsuario } from './tipo-usuario.model';
import { TipoUsuarioService } from './tipo-usuario.service';

@Component({
    selector: 'jhi-tipo-usuario-detail',
    templateUrl: './tipo-usuario-detail.component.html'
})
export class TipoUsuarioDetailComponent implements OnInit, OnDestroy {

    tipoUsuario: TipoUsuario;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tipoUsuarioService: TipoUsuarioService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTipoUsuarios();
    }

    load(id) {
        this.tipoUsuarioService.find(id).subscribe((tipoUsuario) => {
            this.tipoUsuario = tipoUsuario;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTipoUsuarios() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tipoUsuarioListModification',
            (response) => this.load(this.tipoUsuario.id)
        );
    }
}
