/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { AtenaccadopDetailComponent } from '../../../../../../main/webapp/app/entities/atenaccadop/atenaccadop-detail.component';
import { AtenaccadopService } from '../../../../../../main/webapp/app/entities/atenaccadop/atenaccadop.service';
import { Atenaccadop } from '../../../../../../main/webapp/app/entities/atenaccadop/atenaccadop.model';

describe('Component Tests', () => {

    describe('Atenaccadop Management Detail Component', () => {
        let comp: AtenaccadopDetailComponent;
        let fixture: ComponentFixture<AtenaccadopDetailComponent>;
        let service: AtenaccadopService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [AtenaccadopDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    AtenaccadopService,
                    JhiEventManager
                ]
            }).overrideTemplate(AtenaccadopDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AtenaccadopDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AtenaccadopService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Atenaccadop(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.atenaccadop).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
