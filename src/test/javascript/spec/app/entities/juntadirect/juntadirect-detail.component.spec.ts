/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { JuntadirectDetailComponent } from '../../../../../../main/webapp/app/entities/juntadirect/juntadirect-detail.component';
import { JuntadirectService } from '../../../../../../main/webapp/app/entities/juntadirect/juntadirect.service';
import { Juntadirect } from '../../../../../../main/webapp/app/entities/juntadirect/juntadirect.model';

describe('Component Tests', () => {

    describe('Juntadirect Management Detail Component', () => {
        let comp: JuntadirectDetailComponent;
        let fixture: ComponentFixture<JuntadirectDetailComponent>;
        let service: JuntadirectService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [JuntadirectDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    JuntadirectService,
                    JhiEventManager
                ]
            }).overrideTemplate(JuntadirectDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(JuntadirectDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JuntadirectService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Juntadirect(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.juntadirect).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
