/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { BensocialDetailComponent } from '../../../../../../main/webapp/app/entities/bensocial/bensocial-detail.component';
import { BensocialService } from '../../../../../../main/webapp/app/entities/bensocial/bensocial.service';
import { Bensocial } from '../../../../../../main/webapp/app/entities/bensocial/bensocial.model';

describe('Component Tests', () => {

    describe('Bensocial Management Detail Component', () => {
        let comp: BensocialDetailComponent;
        let fixture: ComponentFixture<BensocialDetailComponent>;
        let service: BensocialService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [BensocialDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    BensocialService,
                    JhiEventManager
                ]
            }).overrideTemplate(BensocialDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BensocialDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BensocialService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Bensocial(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.bensocial).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
