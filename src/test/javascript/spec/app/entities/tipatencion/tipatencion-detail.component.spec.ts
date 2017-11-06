/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TipatencionDetailComponent } from '../../../../../../main/webapp/app/entities/tipatencion/tipatencion-detail.component';
import { TipatencionService } from '../../../../../../main/webapp/app/entities/tipatencion/tipatencion.service';
import { Tipatencion } from '../../../../../../main/webapp/app/entities/tipatencion/tipatencion.model';

describe('Component Tests', () => {

    describe('Tipatencion Management Detail Component', () => {
        let comp: TipatencionDetailComponent;
        let fixture: ComponentFixture<TipatencionDetailComponent>;
        let service: TipatencionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [TipatencionDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TipatencionService,
                    JhiEventManager
                ]
            }).overrideTemplate(TipatencionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TipatencionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipatencionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Tipatencion(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.tipatencion).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
