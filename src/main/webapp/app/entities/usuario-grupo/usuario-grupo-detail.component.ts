import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { UsuarioGrupo } from './usuario-grupo.model';
import { UsuarioGrupoService } from './usuario-grupo.service';

@Component({
    selector: 'jhi-usuario-grupo-detail',
    templateUrl: './usuario-grupo-detail.component.html'
})
export class UsuarioGrupoDetailComponent implements OnInit, OnDestroy {

    usuarioGrupo: UsuarioGrupo;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private usuarioGrupoService: UsuarioGrupoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInUsuarioGrupos();
    }

    load(id) {
        this.usuarioGrupoService.find(id).subscribe((usuarioGrupo) => {
            this.usuarioGrupo = usuarioGrupo;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInUsuarioGrupos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'usuarioGrupoListModification',
            (response) => this.load(this.usuarioGrupo.id)
        );
    }
}
