/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TipviaDetailComponent } from '../../../../../../main/webapp/app/entities/tipvia/tipvia-detail.component';
import { TipviaService } from '../../../../../../main/webapp/app/entities/tipvia/tipvia.service';
import { Tipvia } from '../../../../../../main/webapp/app/entities/tipvia/tipvia.model';

describe('Component Tests', () => {

    describe('Tipvia Management Detail Component', () => {
        let comp: TipviaDetailComponent;
        let fixture: ComponentFixture<TipviaDetailComponent>;
        let service: TipviaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [TipviaDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TipviaService,
                    JhiEventManager
                ]
            }).overrideTemplate(TipviaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TipviaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipviaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Tipvia(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.tipvia).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
