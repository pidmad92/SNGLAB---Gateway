/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { DenunteDetailComponent } from '../../../../../../main/webapp/app/entities/denunte/denunte-detail.component';
import { DenunteService } from '../../../../../../main/webapp/app/entities/denunte/denunte.service';
import { Denunte } from '../../../../../../main/webapp/app/entities/denunte/denunte.model';

describe('Component Tests', () => {

    describe('Denunte Management Detail Component', () => {
        let comp: DenunteDetailComponent;
        let fixture: ComponentFixture<DenunteDetailComponent>;
        let service: DenunteService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [DenunteDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    DenunteService,
                    JhiEventManager
                ]
            }).overrideTemplate(DenunteDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DenunteDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DenunteService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Denunte(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.denunte).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
