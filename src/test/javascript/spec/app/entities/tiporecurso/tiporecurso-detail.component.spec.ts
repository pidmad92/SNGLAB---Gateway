/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TiporecursoDetailComponent } from '../../../../../../main/webapp/app/entities/tiporecurso/tiporecurso-detail.component';
import { TiporecursoService } from '../../../../../../main/webapp/app/entities/tiporecurso/tiporecurso.service';
import { Tiporecurso } from '../../../../../../main/webapp/app/entities/tiporecurso/tiporecurso.model';

describe('Component Tests', () => {

    describe('Tiporecurso Management Detail Component', () => {
        let comp: TiporecursoDetailComponent;
        let fixture: ComponentFixture<TiporecursoDetailComponent>;
        let service: TiporecursoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [TiporecursoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TiporecursoService,
                    JhiEventManager
                ]
            }).overrideTemplate(TiporecursoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TiporecursoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TiporecursoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Tiporecurso(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.tiporecurso).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
