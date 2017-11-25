/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { EstpericalDetailComponent } from '../../../../../../main/webapp/app/entities/estperical/estperical-detail.component';
import { EstpericalService } from '../../../../../../main/webapp/app/entities/estperical/estperical.service';
import { Estperical } from '../../../../../../main/webapp/app/entities/estperical/estperical.model';

describe('Component Tests', () => {

    describe('Estperical Management Detail Component', () => {
        let comp: EstpericalDetailComponent;
        let fixture: ComponentFixture<EstpericalDetailComponent>;
        let service: EstpericalService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [EstpericalDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    EstpericalService,
                    JhiEventManager
                ]
            }).overrideTemplate(EstpericalDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EstpericalDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EstpericalService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Estperical(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.estperical).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
