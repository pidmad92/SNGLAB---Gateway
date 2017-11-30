/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TipdiligencDetailComponent } from '../../../../../../main/webapp/app/entities/tipdiligenc/tipdiligenc-detail.component';
import { TipdiligencService } from '../../../../../../main/webapp/app/entities/tipdiligenc/tipdiligenc.service';
import { Tipdiligenc } from '../../../../../../main/webapp/app/entities/tipdiligenc/tipdiligenc.model';

describe('Component Tests', () => {

    describe('Tipdiligenc Management Detail Component', () => {
        let comp: TipdiligencDetailComponent;
        let fixture: ComponentFixture<TipdiligencDetailComponent>;
        let service: TipdiligencService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [TipdiligencDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TipdiligencService,
                    JhiEventManager
                ]
            }).overrideTemplate(TipdiligencDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TipdiligencDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipdiligencService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Tipdiligenc(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.tipdiligenc).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
