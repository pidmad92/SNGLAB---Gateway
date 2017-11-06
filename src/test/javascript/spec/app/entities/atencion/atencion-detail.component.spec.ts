/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { AtencionDetailComponent } from '../../../../../../main/webapp/app/entities/atencion/atencion-detail.component';
import { AtencionService } from '../../../../../../main/webapp/app/entities/atencion/atencion.service';
import { Atencion } from '../../../../../../main/webapp/app/entities/atencion/atencion.model';

describe('Component Tests', () => {

    describe('Atencion Management Detail Component', () => {
        let comp: AtencionDetailComponent;
        let fixture: ComponentFixture<AtencionDetailComponent>;
        let service: AtencionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [AtencionDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    AtencionService,
                    JhiEventManager
                ]
            }).overrideTemplate(AtencionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AtencionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AtencionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Atencion(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.atencion).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
