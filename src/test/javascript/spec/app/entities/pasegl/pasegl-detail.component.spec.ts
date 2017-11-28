/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { PaseglDetailComponent } from '../../../../../../main/webapp/app/entities/pasegl/pasegl-detail.component';
import { PaseglService } from '../../../../../../main/webapp/app/entities/pasegl/pasegl.service';
import { Pasegl } from '../../../../../../main/webapp/app/entities/pasegl/pasegl.model';

describe('Component Tests', () => {

    describe('Pasegl Management Detail Component', () => {
        let comp: PaseglDetailComponent;
        let fixture: ComponentFixture<PaseglDetailComponent>;
        let service: PaseglService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [PaseglDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    PaseglService,
                    JhiEventManager
                ]
            }).overrideTemplate(PaseglDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PaseglDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PaseglService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Pasegl(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.pasegl).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
