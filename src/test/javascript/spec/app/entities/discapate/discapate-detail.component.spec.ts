/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { DiscapateDetailComponent } from '../../../../../../main/webapp/app/entities/discapate/discapate-detail.component';
import { DiscapateService } from '../../../../../../main/webapp/app/entities/discapate/discapate.service';
import { Discapate } from '../../../../../../main/webapp/app/entities/discapate/discapate.model';

describe('Component Tests', () => {

    describe('Discapate Management Detail Component', () => {
        let comp: DiscapateDetailComponent;
        let fixture: ComponentFixture<DiscapateDetailComponent>;
        let service: DiscapateService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [DiscapateDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    DiscapateService,
                    JhiEventManager
                ]
            }).overrideTemplate(DiscapateDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DiscapateDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DiscapateService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Discapate(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.discapate).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
