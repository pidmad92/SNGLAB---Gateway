/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { GrupoDetailComponent } from '../../../../../../main/webapp/app/entities/grupo/grupo-detail.component';
import { GrupoService } from '../../../../../../main/webapp/app/entities/grupo/grupo.service';
import { Grupo } from '../../../../../../main/webapp/app/entities/grupo/grupo.model';

describe('Component Tests', () => {

    describe('Grupo Management Detail Component', () => {
        let comp: GrupoDetailComponent;
        let fixture: ComponentFixture<GrupoDetailComponent>;
        let service: GrupoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [GrupoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    GrupoService,
                    JhiEventManager
                ]
            }).overrideTemplate(GrupoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GrupoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GrupoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Grupo(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.grupo).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
