/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TipconremDetailComponent } from '../../../../../../main/webapp/app/entities/tipconrem/tipconrem-detail.component';
import { TipconremService } from '../../../../../../main/webapp/app/entities/tipconrem/tipconrem.service';
import { Tipconrem } from '../../../../../../main/webapp/app/entities/tipconrem/tipconrem.model';

describe('Component Tests', () => {

    describe('Tipconrem Management Detail Component', () => {
        let comp: TipconremDetailComponent;
        let fixture: ComponentFixture<TipconremDetailComponent>;
        let service: TipconremService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [TipconremDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TipconremService,
                    JhiEventManager
                ]
            }).overrideTemplate(TipconremDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TipconremDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipconremService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Tipconrem(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.tipconrem).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
