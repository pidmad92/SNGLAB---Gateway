/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TipzonaDetailComponent } from '../../../../../../main/webapp/app/entities/tipzona/tipzona-detail.component';
import { TipzonaService } from '../../../../../../main/webapp/app/entities/tipzona/tipzona.service';
import { Tipzona } from '../../../../../../main/webapp/app/entities/tipzona/tipzona.model';

describe('Component Tests', () => {

    describe('Tipzona Management Detail Component', () => {
        let comp: TipzonaDetailComponent;
        let fixture: ComponentFixture<TipzonaDetailComponent>;
        let service: TipzonaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [TipzonaDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TipzonaService,
                    JhiEventManager
                ]
            }).overrideTemplate(TipzonaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TipzonaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipzonaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Tipzona(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.tipzona).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
