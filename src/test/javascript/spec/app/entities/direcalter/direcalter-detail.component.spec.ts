/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { DirecalterDetailComponent } from '../../../../../../main/webapp/app/entities/direcalter/direcalter-detail.component';
import { DirecalterService } from '../../../../../../main/webapp/app/entities/direcalter/direcalter.service';
import { Direcalter } from '../../../../../../main/webapp/app/entities/direcalter/direcalter.model';

describe('Component Tests', () => {

    describe('Direcalter Management Detail Component', () => {
        let comp: DirecalterDetailComponent;
        let fixture: ComponentFixture<DirecalterDetailComponent>;
        let service: DirecalterService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [DirecalterDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    DirecalterService,
                    JhiEventManager
                ]
            }).overrideTemplate(DirecalterDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DirecalterDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DirecalterService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Direcalter(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.direcalter).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
