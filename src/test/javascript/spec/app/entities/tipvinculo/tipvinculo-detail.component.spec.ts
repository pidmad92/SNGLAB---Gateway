/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TipvinculoDetailComponent } from '../../../../../../main/webapp/app/entities/tipvinculo/tipvinculo-detail.component';
import { TipvinculoService } from '../../../../../../main/webapp/app/entities/tipvinculo/tipvinculo.service';
import { Tipvinculo } from '../../../../../../main/webapp/app/entities/tipvinculo/tipvinculo.model';

describe('Component Tests', () => {

    describe('Tipvinculo Management Detail Component', () => {
        let comp: TipvinculoDetailComponent;
        let fixture: ComponentFixture<TipvinculoDetailComponent>;
        let service: TipvinculoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [TipvinculoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TipvinculoService,
                    JhiEventManager
                ]
            }).overrideTemplate(TipvinculoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TipvinculoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipvinculoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Tipvinculo(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.tipvinculo).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
