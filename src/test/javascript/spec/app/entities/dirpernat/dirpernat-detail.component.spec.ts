/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { DirpernatDetailComponent } from '../../../../../../main/webapp/app/entities/dirpernat/dirpernat-detail.component';
import { DirpernatService } from '../../../../../../main/webapp/app/entities/dirpernat/dirpernat.service';
import { Dirpernat } from '../../../../../../main/webapp/app/entities/dirpernat/dirpernat.model';

describe('Component Tests', () => {

    describe('Dirpernat Management Detail Component', () => {
        let comp: DirpernatDetailComponent;
        let fixture: ComponentFixture<DirpernatDetailComponent>;
        let service: DirpernatService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [DirpernatDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    DirpernatService,
                    JhiEventManager
                ]
            }).overrideTemplate(DirpernatDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DirpernatDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DirpernatService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Dirpernat(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.dirpernat).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
