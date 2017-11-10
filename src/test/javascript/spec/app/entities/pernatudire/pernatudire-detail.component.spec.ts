/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { PernatudireDetailComponent } from '../../../../../../main/webapp/app/entities/pernatudire/pernatudire-detail.component';
import { PernatudireService } from '../../../../../../main/webapp/app/entities/pernatudire/pernatudire.service';
import { Pernatudire } from '../../../../../../main/webapp/app/entities/pernatudire/pernatudire.model';

describe('Component Tests', () => {

    describe('Pernatudire Management Detail Component', () => {
        let comp: PernatudireDetailComponent;
        let fixture: ComponentFixture<PernatudireDetailComponent>;
        let service: PernatudireService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [PernatudireDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    PernatudireService,
                    JhiEventManager
                ]
            }).overrideTemplate(PernatudireDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PernatudireDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PernatudireService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Pernatudire(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.pernatudire).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
