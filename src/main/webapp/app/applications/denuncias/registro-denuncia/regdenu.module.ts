import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GatewaySharedModule } from '../../../shared';
import { MessagesModule } from 'primeng/primeng';
import { MessageModule } from 'primeng/primeng';
import { DialogModule } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';
import { StepsModule } from 'primeng/primeng';
import { RegdenuComponent } from './regdenu.component';
import { RegdenuRoute } from './regdenu.route';
import { RegdenuService } from './regdenu.service';
import { PanelModule } from 'primeng/primeng';
import { TabViewModule } from 'primeng/primeng';
import { DropdownModule } from 'primeng/primeng';
import { BlockUIModule } from 'primeng/primeng';
import { InputSwitchModule } from 'primeng/primeng';
import { CheckboxModule } from 'primeng/primeng';
import { InputTextareaModule } from 'primeng/primeng';
import { RadioButtonModule } from 'primeng/primeng';
import { CalendarModule } from 'primeng/primeng';
import { FileUploadModule } from 'primeng/primeng';
import { ValidarrucService } from '../validar-ruc/validarruc.service';
import { ValidarUsuarioService } from '../validar-usuario/validarusuario.service';

const ENTITY_STATES = [
    ...RegdenuRoute
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
        RadioButtonModule,
        CalendarModule,
        FileUploadModule,
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RegdenuComponent
    ],
    entryComponents: [
        RegdenuComponent
    ],
    providers: [
        RegdenuService,
        MessageService,
        ValidarrucService,
        ValidarUsuarioService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RegdenuModule { }
