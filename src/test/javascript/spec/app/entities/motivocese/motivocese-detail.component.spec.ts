/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { MotivoceseDetailComponent } from '../../../../../../main/webapp/app/entities/motivocese/motivocese-detail.component';
import { MotivoceseService } from '../../../../../../main/webapp/app/entities/motivocese/motivocese.service';
import { Motivocese } from '../../../../../../main/webapp/app/entities/motivocese/motivocese.model';

describe('Component Tests', () => {

    describe('Motivocese Management Detail Component', () => {
        let comp: MotivoceseDetailComponent;
        let fixture: ComponentFixture<MotivoceseDetailComponent>;
        let service: MotivoceseService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [MotivoceseDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    MotivoceseService,
                    JhiEventManager
                ]
            }).overrideTemplate(MotivoceseDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MotivoceseDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MotivoceseService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Motivocese(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.motivocese).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
