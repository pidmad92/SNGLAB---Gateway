/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ResolutorDetailComponent } from '../../../../../../main/webapp/app/entities/resolutor/resolutor-detail.component';
import { ResolutorService } from '../../../../../../main/webapp/app/entities/resolutor/resolutor.service';
import { Resolutor } from '../../../../../../main/webapp/app/entities/resolutor/resolutor.model';

describe('Component Tests', () => {

    describe('Resolutor Management Detail Component', () => {
        let comp: ResolutorDetailComponent;
        let fixture: ComponentFixture<ResolutorDetailComponent>;
        let service: ResolutorService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ResolutorDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ResolutorService,
                    JhiEventManager
                ]
            }).overrideTemplate(ResolutorDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ResolutorDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ResolutorService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Resolutor(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.resolutor).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
