/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { DatdenuDetailComponent } from '../../../../../../main/webapp/app/entities/datdenu/datdenu-detail.component';
import { DatdenuService } from '../../../../../../main/webapp/app/entities/datdenu/datdenu.service';
import { Datdenu } from '../../../../../../main/webapp/app/entities/datdenu/datdenu.model';

describe('Component Tests', () => {

    describe('Datdenu Management Detail Component', () => {
        let comp: DatdenuDetailComponent;
        let fixture: ComponentFixture<DatdenuDetailComponent>;
        let service: DatdenuService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [DatdenuDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    DatdenuService,
                    JhiEventManager
                ]
            }).overrideTemplate(DatdenuDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DatdenuDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DatdenuService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Datdenu(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.datdenu).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
