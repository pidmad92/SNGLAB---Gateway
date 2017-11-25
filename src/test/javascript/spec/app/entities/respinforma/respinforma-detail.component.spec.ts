/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { RespinformaDetailComponent } from '../../../../../../main/webapp/app/entities/respinforma/respinforma-detail.component';
import { RespinformaService } from '../../../../../../main/webapp/app/entities/respinforma/respinforma.service';
import { Respinforma } from '../../../../../../main/webapp/app/entities/respinforma/respinforma.model';

describe('Component Tests', () => {

    describe('Respinforma Management Detail Component', () => {
        let comp: RespinformaDetailComponent;
        let fixture: ComponentFixture<RespinformaDetailComponent>;
        let service: RespinformaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [RespinformaDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    RespinformaService,
                    JhiEventManager
                ]
            }).overrideTemplate(RespinformaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RespinformaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RespinformaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Respinforma(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.respinforma).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
