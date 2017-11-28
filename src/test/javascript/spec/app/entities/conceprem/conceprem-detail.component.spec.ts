/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ConcepremDetailComponent } from '../../../../../../main/webapp/app/entities/conceprem/conceprem-detail.component';
import { ConcepremService } from '../../../../../../main/webapp/app/entities/conceprem/conceprem.service';
import { Conceprem } from '../../../../../../main/webapp/app/entities/conceprem/conceprem.model';

describe('Component Tests', () => {

    describe('Conceprem Management Detail Component', () => {
        let comp: ConcepremDetailComponent;
        let fixture: ComponentFixture<ConcepremDetailComponent>;
        let service: ConcepremService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ConcepremDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ConcepremService,
                    JhiEventManager
                ]
            }).overrideTemplate(ConcepremDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ConcepremDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ConcepremService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Conceprem(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.conceprem).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
