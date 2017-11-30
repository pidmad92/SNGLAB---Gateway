/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { SzonalDetailComponent } from '../../../../../../main/webapp/app/entities/szonal/szonal-detail.component';
import { SzonalService } from '../../../../../../main/webapp/app/entities/szonal/szonal.service';
import { Szonal } from '../../../../../../main/webapp/app/entities/szonal/szonal.model';

describe('Component Tests', () => {

    describe('Szonal Management Detail Component', () => {
        let comp: SzonalDetailComponent;
        let fixture: ComponentFixture<SzonalDetailComponent>;
        let service: SzonalService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [SzonalDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    SzonalService,
                    JhiEventManager
                ]
            }).overrideTemplate(SzonalDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SzonalDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SzonalService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Szonal(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.szonal).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
