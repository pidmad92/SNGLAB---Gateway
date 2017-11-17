/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ResolucrdDetailComponent } from '../../../../../../main/webapp/app/entities/resolucrd/resolucrd-detail.component';
import { ResolucrdService } from '../../../../../../main/webapp/app/entities/resolucrd/resolucrd.service';
import { Resolucrd } from '../../../../../../main/webapp/app/entities/resolucrd/resolucrd.model';

describe('Component Tests', () => {

    describe('Resolucrd Management Detail Component', () => {
        let comp: ResolucrdDetailComponent;
        let fixture: ComponentFixture<ResolucrdDetailComponent>;
        let service: ResolucrdService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ResolucrdDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ResolucrdService,
                    JhiEventManager
                ]
            }).overrideTemplate(ResolucrdDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ResolucrdDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ResolucrdService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Resolucrd(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.resolucrd).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
