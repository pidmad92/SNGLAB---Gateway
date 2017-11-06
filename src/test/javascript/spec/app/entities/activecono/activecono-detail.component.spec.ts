/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ActiveconoDetailComponent } from '../../../../../../main/webapp/app/entities/activecono/activecono-detail.component';
import { ActiveconoService } from '../../../../../../main/webapp/app/entities/activecono/activecono.service';
import { Activecono } from '../../../../../../main/webapp/app/entities/activecono/activecono.model';

describe('Component Tests', () => {

    describe('Activecono Management Detail Component', () => {
        let comp: ActiveconoDetailComponent;
        let fixture: ComponentFixture<ActiveconoDetailComponent>;
        let service: ActiveconoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ActiveconoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ActiveconoService,
                    JhiEventManager
                ]
            }).overrideTemplate(ActiveconoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ActiveconoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ActiveconoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Activecono(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.activecono).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
