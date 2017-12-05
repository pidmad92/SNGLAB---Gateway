import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { customHttpProvider } from '../../blocks/interceptor/http.provider';

import { GatewayFalsoexpModule } from '../../entities/falsoexp/falsoexp.module';
import { GatewayLegajoModule } from '../../entities/legajo/legajo.module';
import { GatewayLegajoasigModule } from '../../entities/legajoasig/legajoasig.module';
import { GatewayLegtipdocModule } from '../../entities/legtipdoc/legtipdoc.module';
import { GatewayPasepjModule } from '../../entities/pasepj/pasepj.module';
import { GatewayAtencionpjModule } from '../../entities/atencionpj/atencionpj.module';
import { GatewayAbogadoModule } from '../../entities/abogado/abogado.module';
import { GatewayMateriaModule } from '../../entities/materia/materia.module';
import { GatewayTipdocpjModule } from '../../entities/tipdocpj/tipdocpj.module';
import { GatewayTipaudiModule } from '../../entities/tipaudi/tipaudi.module';
import { GatewayTipdiligencModule } from '../../entities/tipdiligenc/tipdiligenc.module';
import { GatewayTipresolucModule } from '../../entities/tipresoluc/tipresoluc.module';

import { RegistroLegajoModule } from './legajo-registro/legajo-registro.module';
import { AtencionLegajoModule } from './atencion-legajo/atencion-legajo.module';

/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        GatewayFalsoexpModule,
        GatewayLegajoModule,
        GatewayLegajoasigModule,
        GatewayLegtipdocModule,
        GatewayPasepjModule,
        GatewayAtencionpjModule,
        GatewayAbogadoModule,
        GatewayMateriaModule,
        GatewayTipdocpjModule,
        GatewayTipaudiModule,
        GatewayTipdiligencModule,
        GatewayTipresolucModule,
        RegistroLegajoModule,
        AtencionLegajoModule
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [customHttpProvider()],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayPatrocinioModule {}
