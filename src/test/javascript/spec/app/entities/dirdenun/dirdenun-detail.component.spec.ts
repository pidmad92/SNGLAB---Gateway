/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { DirdenunDetailComponent } from '../../../../../../main/webapp/app/entities/dirdenun/dirdenun-detail.component';
import { DirdenunService } from '../../../../../../main/webapp/app/entities/dirdenun/dirdenun.service';
import { Dirdenun } from '../../../../../../main/webapp/app/entities/dirdenun/dirdenun.model';

describe('Component Tests', () => {

    describe('Dirdenun Management Detail Component', () => {
        let comp: DirdenunDetailComponent;
        let fixture: ComponentFixture<DirdenunDetailComponent>;
        let service: DirdenunService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [DirdenunDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    DirdenunService,
                    JhiEventManager
                ]
            }).overrideTemplate(DirdenunDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DirdenunDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DirdenunService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Dirdenun(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.dirdenun).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
