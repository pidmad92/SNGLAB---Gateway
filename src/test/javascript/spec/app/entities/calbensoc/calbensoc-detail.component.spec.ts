/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { CalbensocDetailComponent } from '../../../../../../main/webapp/app/entities/calbensoc/calbensoc-detail.component';
import { CalbensocService } from '../../../../../../main/webapp/app/entities/calbensoc/calbensoc.service';
import { Calbensoc } from '../../../../../../main/webapp/app/entities/calbensoc/calbensoc.model';

describe('Component Tests', () => {

    describe('Calbensoc Management Detail Component', () => {
        let comp: CalbensocDetailComponent;
        let fixture: ComponentFixture<CalbensocDetailComponent>;
        let service: CalbensocService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [CalbensocDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    CalbensocService,
                    JhiEventManager
                ]
            }).overrideTemplate(CalbensocDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CalbensocDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CalbensocService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Calbensoc(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.calbensoc).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
