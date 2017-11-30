/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { SindicatoDetailComponent } from '../../../../../../main/webapp/app/entities/sindicato/sindicato-detail.component';
import { SindicatoService } from '../../../../../../main/webapp/app/entities/sindicato/sindicato.service';
import { Sindicato } from '../../../../../../main/webapp/app/entities/sindicato/sindicato.model';

describe('Component Tests', () => {

    describe('Sindicato Management Detail Component', () => {
        let comp: SindicatoDetailComponent;
        let fixture: ComponentFixture<SindicatoDetailComponent>;
        let service: SindicatoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [SindicatoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    SindicatoService,
                    JhiEventManager
                ]
            }).overrideTemplate(SindicatoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SindicatoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SindicatoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Sindicato(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.sindicato).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
