/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { CartrabDetailComponent } from '../../../../../../main/webapp/app/entities/cartrab/cartrab-detail.component';
import { CartrabService } from '../../../../../../main/webapp/app/entities/cartrab/cartrab.service';
import { Cartrab } from '../../../../../../main/webapp/app/entities/cartrab/cartrab.model';

describe('Component Tests', () => {

    describe('Cartrab Management Detail Component', () => {
        let comp: CartrabDetailComponent;
        let fixture: ComponentFixture<CartrabDetailComponent>;
        let service: CartrabService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [CartrabDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    CartrabService,
                    JhiEventManager
                ]
            }).overrideTemplate(CartrabDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CartrabDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CartrabService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Cartrab(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.cartrab).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
