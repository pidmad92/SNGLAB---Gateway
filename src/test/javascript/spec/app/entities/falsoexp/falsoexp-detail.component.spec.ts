/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { FalsoexpDetailComponent } from '../../../../../../main/webapp/app/entities/falsoexp/falsoexp-detail.component';
import { FalsoexpService } from '../../../../../../main/webapp/app/entities/falsoexp/falsoexp.service';
import { Falsoexp } from '../../../../../../main/webapp/app/entities/falsoexp/falsoexp.model';

describe('Component Tests', () => {

    describe('Falsoexp Management Detail Component', () => {
        let comp: FalsoexpDetailComponent;
        let fixture: ComponentFixture<FalsoexpDetailComponent>;
        let service: FalsoexpService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [FalsoexpDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    FalsoexpService,
                    JhiEventManager
                ]
            }).overrideTemplate(FalsoexpDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FalsoexpDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FalsoexpService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Falsoexp(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.falsoexp).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
