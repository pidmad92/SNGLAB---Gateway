/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { CalidenuDetailComponent } from '../../../../../../main/webapp/app/entities/calidenu/calidenu-detail.component';
import { CalidenuService } from '../../../../../../main/webapp/app/entities/calidenu/calidenu.service';
import { Calidenu } from '../../../../../../main/webapp/app/entities/calidenu/calidenu.model';

describe('Component Tests', () => {

    describe('Calidenu Management Detail Component', () => {
        let comp: CalidenuDetailComponent;
        let fixture: ComponentFixture<CalidenuDetailComponent>;
        let service: CalidenuService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [CalidenuDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    CalidenuService,
                    JhiEventManager
                ]
            }).overrideTemplate(CalidenuDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CalidenuDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CalidenuService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Calidenu(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.calidenu).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
