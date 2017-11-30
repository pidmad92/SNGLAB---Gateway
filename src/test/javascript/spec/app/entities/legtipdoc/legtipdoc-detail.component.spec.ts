/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { LegtipdocDetailComponent } from '../../../../../../main/webapp/app/entities/legtipdoc/legtipdoc-detail.component';
import { LegtipdocService } from '../../../../../../main/webapp/app/entities/legtipdoc/legtipdoc.service';
import { Legtipdoc } from '../../../../../../main/webapp/app/entities/legtipdoc/legtipdoc.model';

describe('Component Tests', () => {

    describe('Legtipdoc Management Detail Component', () => {
        let comp: LegtipdocDetailComponent;
        let fixture: ComponentFixture<LegtipdocDetailComponent>;
        let service: LegtipdocService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [LegtipdocDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    LegtipdocService,
                    JhiEventManager
                ]
            }).overrideTemplate(LegtipdocDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LegtipdocDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LegtipdocService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Legtipdoc(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.legtipdoc).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
