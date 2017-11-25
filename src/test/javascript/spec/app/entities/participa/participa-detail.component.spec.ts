/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ParticipaDetailComponent } from '../../../../../../main/webapp/app/entities/participa/participa-detail.component';
import { ParticipaService } from '../../../../../../main/webapp/app/entities/participa/participa.service';
import { Participa } from '../../../../../../main/webapp/app/entities/participa/participa.model';

describe('Component Tests', () => {

    describe('Participa Management Detail Component', () => {
        let comp: ParticipaDetailComponent;
        let fixture: ComponentFixture<ParticipaDetailComponent>;
        let service: ParticipaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ParticipaDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ParticipaService,
                    JhiEventManager
                ]
            }).overrideTemplate(ParticipaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ParticipaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ParticipaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Participa(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.participa).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
