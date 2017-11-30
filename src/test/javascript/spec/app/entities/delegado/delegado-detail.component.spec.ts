/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { DelegadoDetailComponent } from '../../../../../../main/webapp/app/entities/delegado/delegado-detail.component';
import { DelegadoService } from '../../../../../../main/webapp/app/entities/delegado/delegado.service';
import { Delegado } from '../../../../../../main/webapp/app/entities/delegado/delegado.model';

describe('Component Tests', () => {

    describe('Delegado Management Detail Component', () => {
        let comp: DelegadoDetailComponent;
        let fixture: ComponentFixture<DelegadoDetailComponent>;
        let service: DelegadoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [DelegadoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    DelegadoService,
                    JhiEventManager
                ]
            }).overrideTemplate(DelegadoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DelegadoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DelegadoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Delegado(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.delegado).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
