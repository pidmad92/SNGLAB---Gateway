import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GatewaySharedModule } from '../../../shared';
import { MessagesModule } from 'primeng/primeng';
import { MessageModule } from 'primeng/primeng';
import { DialogModule } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';
import { StepsModule } from 'primeng/primeng';
import { FormregdenunciaComponent } from './formregdenuncia.component';
import { FormregdenunciaRoute } from './formregdenuncia.route';
import { FormregdenunciaService } from './formregdenuncia.service';
import { PanelModule } from 'primeng/primeng';
import { TabViewModule } from 'primeng/primeng';
import { DropdownModule } from 'primeng/primeng';
import { BlockUIModule } from 'primeng/primeng';
import { InputSwitchModule } from 'primeng/primeng';
import { CheckboxModule } from 'primeng/primeng';
import { InputTextareaModule } from 'primeng/primeng';
import { ValidarrucService } from '../validar-ruc/validarruc.service';

const ENTITY_STATES = [
    ...FormregdenunciaRoute
    // ...accionadopPopupRoute,
];

@NgModule({
    imports: [
        MessagesModule,
        MessageModule,
        DialogModule,
        PanelModule,
        TabViewModule,
        DropdownModule,
        BlockUIModule,
        InputSwitchModule,
        CheckboxModule,
        InputTextareaModule,
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FormregdenunciaComponent
    ],
    entryComponents: [
        FormregdenunciaComponent
    ],
    providers: [
        FormregdenunciaService,
        MessageService,
        ValidarrucService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FormularioregdenunciaModule { }
