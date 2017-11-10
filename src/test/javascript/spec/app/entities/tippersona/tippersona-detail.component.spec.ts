/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TippersonaDetailComponent } from '../../../../../../main/webapp/app/entities/tippersona/tippersona-detail.component';
import { TippersonaService } from '../../../../../../main/webapp/app/entities/tippersona/tippersona.service';
import { Tippersona } from '../../../../../../main/webapp/app/entities/tippersona/tippersona.model';

describe('Component Tests', () => {

    describe('Tippersona Management Detail Component', () => {
        let comp: TippersonaDetailComponent;
        let fixture: ComponentFixture<TippersonaDetailComponent>;
        let service: TippersonaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [TippersonaDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TippersonaService,
                    JhiEventManager
                ]
            }).overrideTemplate(TippersonaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TippersonaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TippersonaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Tippersona(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.tippersona).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
