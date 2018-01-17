export class Constants {

    // Formulario 1 - ESTADO DE RESULTADOS(*)
    // -----------------------------------------------------------------
    // INGRESOS POR INTERESES
    public readonly FORM1_INGINT_DISPONIBLE = 'Disponible';
    public readonly FORM1_INGINT_FONDOINTER = 'Fondos Interbancarios';
    public readonly FORM1_INGINT_INVVALORCAMRESUL = 'Inversiones a Valor Razonable con Cambios en Resultados';
    public readonly FORM1_INGINT_DISPONIBLEVENTA = 'Inversiones Disponibles para la venta';
    public readonly FORM1_INGINT_VENCIMIENTO = 'Inversiones a Vencimiento';
    public readonly FORM1_INGINT_CREDDIRECTOS = 'Cartera de Créditos Directos';
    public readonly FORM1_INGINT_OPECOBERTURA = 'Resultado por Operaciones de Cobertura';
    public readonly FORM1_INGINT_CUENTAS = 'Cuentas por Cobrar';
    public readonly FORM1_INGINT_OTROS = 'Otros Ingresos Financieros';
    public readonly FORM1_INGINT_TOTAL = 'TOTAL DE INGRESOS POR INTERESES';
    // GASTOS POR INTERESES
    public readonly FORM1_GASINT_OBLIGPUBLICO = 'Obligaciones con el Público';
    public readonly FORM1_GASINT_FONDOINTER = 'Fondos Interbancarios';
    public readonly FORM1_GASINT_DEPOSISFINAN = 'Depósitos de Empresas del Sistema Financiero y Organismos Financieros Internacionales';
    public readonly FORM1_GASINT_ADEUDOSOBLIG = 'Adeudos y Obligaciones Financieras';
    public readonly FORM1_GASINT_DIFCAMBIO = 'Diferencia de Cambio';
    public readonly FORM1_GASINT_CUENTASPAGAR = 'Cuentas por pagar';
    public readonly FORM1_GASINT_RESULOPECOBER = 'Resultado por Operaciones de Cobertura';
    public readonly FORM1_GASINT_OTROSGASFINAN = 'Otros Gastos Financieros';
    public readonly FORM1_GASINT_TOTAL = 'TOTAL GASTOS POR INTERESES';
    // TOTAL MARGEN FINANCIERO BRUTO
    public readonly FORM1_MARGENFINANBRUTO = 'MARGEN FINANCIERO BRUTO';
    // PROVISIONES PARA CRÉDITOS DIRECTOS (1)
    public readonly FORM1_PROCREDIR_TOTAL = 'TOTAL PROVISIONES PARA CRÉDITOS DIRECTOS';
    // TOTAL MARGEN FINANCIERO BRUTO (DESPUÉS DE PROVISIONES)
    public readonly FORM1_MARGENFINANBRUTODESPPROV = 'MARGEN FINANCIERO BRUTO (DESPUÉS DE PROVISIONES)';
    // INGRESOS POR SERVICIOS FINANCIEROS
    public readonly FORM1_INGSERFIN_CREDINDI = 'Ingresos por Créditos Indirectos';
    public readonly FORM1_INGSERFIN_FIDEICOMISIONES = 'Ingresos por Fideicomisos y Comisiones de Confianza';
    public readonly FORM1_INGSERFIN_EMISIONELEC = 'Ingresos por Emisión de Dinero Electrónico';
    public readonly FORM1_INGSERFIN_DIVERSOS = 'Ingresos Diversos';
    public readonly FORM1_INGSERFIN_TOTAL = 'TOTAL INGRESOS POR SERVICIOS FINANCIEROS';
    // GASTOS POR SERVICIOS FINANCIEROS
    public readonly FORM1_GASSERFIN_CREDINDI = 'Gastos por Créditos indirectos';
    public readonly FORM1_GASSERFIN_FIDEICOMISIONES = 'Gastos por Fideicomisos y Comisiones de Confianza';
    public readonly FORM1_GASSERFIN_PRIMASFONSEGDEPO = 'Primas al Fondo Seguro de Depósito';
    public readonly FORM1_GASSERFIN_DIVERSOS = 'Gastos Diversos';
    public readonly FORM1_GASSERFIN_TOTAL = 'TOTAL GASTOS POR SERVICIOS FINANCIEROS';
    // TOTAL MARGEN FINANCIERO NETO DE INGRESOS Y GASTOS POR SERVICIOS FINANCIEROS
    public readonly FORM1_MARGENFINANNETOGASSERVFINAN = 'MARGEN FINANCIERO NETO DE INGRESOS Y GASTOS POR SERVICIOS FINANCIEROS';
    // ROF
    public readonly FORM1_ROF = 'RESULTADO POR OPERACIONES FINANCIERAS (ROF)';
    // TOTAL MARGEN OPERACIONAL
    public readonly FORM1_MARGENOPERACIONAL = 'MARGEN OPERACIONAL';
    // GASTOS DE ADMINISTRACIÓN
    public readonly FORM1_GASTOSADMIN_PERSONAL = 'Personal';
    public readonly FORM1_GASTOSADMIN_DIRECTORIO = 'Directorio';
    public readonly FORM1_GASTOSADMIN_SERVICIOS = 'Servicios Recibidos de Terceros';
    public readonly FORM1_GASTOSADMIN_IMPUESTOS = 'Impuestos y Contribuciones';
    public readonly FORM1_GASTOSADMIN_TOTAL = 'TOTAL GASTOS DE ADMINISTRACIÓN';
    // DEPRECIACIONES Y AMORTIZACIONES
    public readonly FORM1_DEPRECIACIONES_AMORTIZACIONES = 'DEPRECIACIONES Y AMORTIZACIONES';
    // TOTAL MARGEN OPERACIONAL NETO
    public readonly FORM1_MARGENOPERACIONALNETO = 'MARGEN OPERACIONAL NETO';
    // VALUACIÓN DE ACTIVOS Y PROVISIONES
    public readonly FORM1_VALUACIONACTPROV = 'VALUACIÓN DE ACTIVOS Y PROVISIONES';
    // TOTAL RESULTADO DE OPERACIÓN
    public readonly FORM1_RESULOPE = 'RESULTADO DE OPERACIÓN';
    // OTROS INGRESOS (1)
    public readonly FORM1_OTROSING_TOTAL = 'TOTAL OTROS INGRESOS';
    // OTROS GASTOS (1)
    public readonly FORM1_OTROSGAS_TOTAL = 'TOTAL OTROS GASTOS';
    // TOTAL OTROS INGRESOS Y OTROS GASTOS
    public readonly FORM1_OTROSING_OTROSGAS_TOTAL = 'TOTAL OTROS INGRESOS Y OTROS GASTOS';
    // TOTAL RESULTADO ANTES DE IMPUESTO A LA RENTA
    public readonly FORM1_RESULTADO_IMPUESTORENTA = 'RESULTADO ANTES DE IMPUESTO A LA RENTA';
    // IMPUESTO A LA RENTA
    public readonly FORM1_IMPRENTA_IMPUESTO = 'IMPUESTO A LA RENTA';
    // TOTAL RESULTADO NETO DEL EJERCICIO
    public readonly FORM1_RESULTADONETOEJERCICIO = 'RESULTADO NETO DEL EJERCICIO';

    // Formulario 2 - ESTADO DE SITUACIÓN FINANCIERA(*)
    // -----------------------------------------------------------------
    // ACTIVO CORRIENTE
    public readonly FORM2_AC_DISPONIBLE = 'DISPONIBLE (*)';
    public readonly FORM2_AC_FONDOSINTERBANCARIOS = 'FONDOS INTERBANCARIOS';
    public readonly FORM2_AC_INVCAMBIORESUL = 'INVERSIONES A VALOR RAZONABLE CON CAMBIOS EN RESULTADOS';
    public readonly FORM2_AC_INVDISPONIBLEVENTA = 'INVERSIONES DISPONIBLES PARA LA VENTA';
    public readonly FORM2_AC_INVVENCIMIENTO = 'INVERSIONES A VENCIMIENTO';
    public readonly FORM2_AC_CARTERACREDNETOS = 'CARTERA DE CRÉDITOS NETOS (*)';
    public readonly FORM2_AC_CARTERACREDVIG = 'Cartera de Créditos Vigentes';
    public readonly FORM2_AC_CARTERACREDREEST = 'Cartera de Créditos Reestructurados';
    public readonly FORM2_AC_CARTERACREDREFIN = 'Cartera de Créditos Refinanciados';
    public readonly FORM2_AC_CARTERACREDVENC = 'Cartera de Créditos Vencidos';
    public readonly FORM2_AC_CARTERACREDCOBRA = 'Cartera de Créditos en Cobranza Judicial';
    public readonly FORM2_AC_PROVCRED = 'Provisiones para Créditos';
    public readonly FORM2_AC_DERIVADOSNEGOC = 'DERIVADOS PARA NEGOCIACIÓN';
    public readonly FORM2_AC_DEVIVADOSCOBER = 'DERIVADOS DE COBERTURA';
    public readonly FORM2_AC_CUENTASCOBRAR = 'CUENTAS POR COBRAR';
    public readonly FORM2_AC_IMPCORRIENTES = 'IMPUESTOS CORRIENTES';
    public readonly FORM2_AC_OTROS = 'OTROS ACTIVOS CORRIENTES (*)';
    public readonly FORM2_AC_TOTAL = 'TOTAL ACTIVO CORRIENTE';
    // ACTIVO NO CORRIENTE
    public readonly FORM2_ANC_CATERACREDNETOS = 'CARTERA DE CRÉDITOS NETOS(*)';
    public readonly FORM2_ANC_CARTERACREDVIG = 'Cartera de Créditos Vigentes';
    public readonly FORM2_ANC_CARTERACREDREEST = 'Cartera de Créditos Reestructurados';
    public readonly FORM2_ANC_CARTERACREDREFIN = 'Cartera de Créditos Refinanciados';
    public readonly FORM2_ANC_CARTERACREDVENC = 'Cartera de Créditos Vencidos';
    public readonly FORM2_ANC_CARTERACREDCOBRANZA = 'Cartera de Créditos en Cobranza Judicial';
    public readonly FORM2_ANC_PROVCREDITOS = 'Provisiones para Créditos';
    public readonly FORM2_ANC_BIENES = 'BIENES REALIZABLES, RECIBIDOS EN PAGO Y ADJUDICADOS';
    public readonly FORM2_ANC_PARTICIPACIONES = 'PARTICIPACIONES';
    public readonly FORM2_ANC_INMMOBEQUIPONETO = 'INMUEBLES, MOBILIARIO Y EQUIPO NETO';
    public readonly FORM2_ANC_ACTIVOSINTANGIBLES = 'ACTIVOS INTANGIBLES';
    public readonly FORM2_ANC_IMPCORRIENTES = 'IMPUESTOS CORRIENTES';
    public readonly FORM2_ANC_IMPDIFERIDO = 'IMPUESTO DIFERIDO';
    public readonly FORM2_ANC_MANTENIDOSVENTA = 'ACTIVOS NO CORRIENTES MANTENIDOS PARA LA VENTA';
    public readonly FORM2_ANC_OTROS = 'OTROS ACTIVOS NO CORRIENTES (*)';
    public readonly FORM2_ANC_TOTAL = 'TOTAL ACTIVO NO CORRIENTE';
    // TOTAL ACTIVO
    public readonly FORM2_TOTALACTIVO = 'TOTAL ACTIVO';
    // PASIVO CORRIENTE
    public readonly FORM2_PC_OBLIGPUBLICO = 'OBLIGACIONES CON EL PÚBLICO';
    public readonly FORM2_PC_FONDOSINTER = 'FONDOS INTERBANCARIOS';
    public readonly FORM2_PC_DEPSISFINANCIERO = 'DEPÓSITOS DEL SISTEMA FINANCIERO Y ORGANISMOS INTERNACIONALES';
    public readonly FORM2_PC_ADEUDOSOBLIGFINAN = 'ADEUDOS Y OBLIGACIONES FINANCIERAS';
    public readonly FORM2_PC_DERIVADOSNEGOC = 'DERIVADOS PARA NEGOCIACION';
    public readonly FORM2_PC_DERIVADOSCOBER = 'DERIVADOS PARA COBERTURA';
    public readonly FORM2_PC_CUENTASPAGAR = 'CUENTAS POR PAGAR';
    public readonly FORM2_PC_PROVISIONES = 'PROVISIONES';
    public readonly FORM2_PC_IMPCORRIENTES = 'IMPUESTOS CORRIENTES';
    public readonly FORM2_PC_IMPDIFERIDO = 'IMPUESTO DIFERIDO';
    public readonly FORM2_PC_OTROS = 'OTROS PASIVOS CORRIENTES (*)';
    public readonly FORM2_PC_TOTAL = 'TOTAL PASIVO CORRIENTE';
    // PASIVO NO CORRIENTE
    public readonly FORM2_PNC_OBLIGPUBLICO = 'OBLIGACIONES CON EL PÚBLICO';
    public readonly FORM2_PNC_DEPSISFINANCIERO = 'DEPÓSITOS DEL SISTEMA FINANCIERO Y ORGANISMOS INTERNACIONALES';
    public readonly FORM2_PNC_ADEUDOSOBLIGFINAN = 'ADEUDOS Y OBLIGACIONES FINANCIERAS';
    public readonly FORM2_PNC_IMPDIFERIDO = 'IMPUESTO DIFERIDO';
    public readonly FORM2_PNC_PROVISIONES = 'PROVISIONES';
    public readonly FORM2_PNC_OTROS = 'OTROS PASIVOS NO CORRIENTES (*)';
    public readonly FORM2_PNC_TOTAL = 'TOTAL PASIVO NO CORRIENTE';
    // TOTAL PASIVO
    public readonly FORM2_TOTALPASIVO = 'TOTAL PASIVO';
    // PATRIMONIO
    public readonly FORM2_PAT_CAPITALSOCIAL = 'Capital Social';
    public readonly FORM2_PAT_CAPITALADICIONAL = 'Capital Adicional';
    public readonly FORM2_PAT_RESERVAS = 'Reservas';
    public readonly FORM2_PAT_AJUSTESPATRIMONIO = 'Ajustes al Patrimonio';
    public readonly FORM2_PAT_RESULACUMULADOS = 'Resultados Acumulados';
    public readonly FORM2_PAT_RESULNETOEJERCICIO = 'Resultado Neto del Ejercicio';
    public readonly FORM2_PAT_TOTALPATRIMONIO = 'TOTAL PATRIMONIO';
    // TOTAL PASIVO Y PATRIMONIO
    public readonly FORM2_TOTALPASIVOPATRIMONIO = 'TOTAL PASIVO Y PATRIMONIO';
    // Formulario 2 - ANEXO 2C - DETALLE DE CUENTAS
    // -----------------------------------------------------------------
    // ACTIVOS CORRIENTES
    //  DISPONIBLE
    public readonly FORM2C_AC_DISPONIBLE_CAJA = 'Caja';
    public readonly FORM2C_AC_DISPONIBLE_BCRP = 'Banco Central de Reserva del Perú';
    public readonly FORM2C_AC_DISPONIBLE_BANCOTRASEMPFINAN = 'Bancos y otras Empresas del Sistema Financiero del País';
    public readonly FORM2C_AC_DISPONIBLE_BANCOINSTIFINAN = 'Bancos y otras Instituciones Financieras del Exterior';
    public readonly FORM2C_AC_DISPONIBLE_CANJE = 'Canje';
    public readonly FORM2C_AC_DISPONIBLE_OTROSDISP = 'Otros Disponibilidades';
    public readonly FORM2C_AC_DISPONIBLE_TOTAL = 'TOTAL DISPONIBLE';
    //  CARTERA DE CRÉDITOS NETOS (*)
    //      Vigentes
    public readonly FORM2C_AC_CARTERANETO_VIG_CUENTASCORRIENTES = 'Cuentas Corrientes';
    public readonly FORM2C_AC_CARTERANETO_VIG_TARJETACREDITO = 'Tarjetas de Crédito';
    public readonly FORM2C_AC_CARTERANETO_VIG_DESCUENTOS = 'Descuentos';
    public readonly FORM2C_AC_CARTERANETO_VIG_FACTORING = 'Factoring';
    public readonly FORM2C_AC_CARTERANETO_VIG_PRESTAMOS = 'Préstamos';
    public readonly FORM2C_AC_CARTERANETO_VIG_ARRENFINANC = 'Arrendamiento Financiero';
    public readonly FORM2C_AC_CARTERANETO_VIG_HIPVIVIENDA = 'Hipotecarios para Vivienda';
    public readonly FORM2C_AC_CARTERANETO_VIG_COMEREXTERIOR = 'Comercio Exterior';
    public readonly FORM2C_AC_CARTERANETO_VIG_CREDLIQUIDAR = 'Créditos por Liquidar';
    public readonly FORM2C_AC_CARTERANETO_VIG_OTROS = 'Otros';
    public readonly FORM2C_AC_CARTERANETO_VIG_TOTAL = 'TOTAL CARTERA DE CRÉDITOS VIGENTES';
    //      Refinanciados y Reestructurados
    public readonly FORM2C_AC_CARTERANETO_REFINANREESTRUC = 'Refinanciados y Reestructurados';
    //      Atrasados
    public readonly FORM2C_AC_CARTERANETO_ATRASADOS_VENCIDOS = 'Vencidos';
    public readonly FORM2C_AC_CARTERANETO_ATRASADOS_COBRAJUDICIAL = 'En Cobranza Judicial';
    public readonly FORM2C_AC_CARTERANETO_ATRASADOS_PROVISIONES = 'Provisiones';
    public readonly FORM2C_AC_CARTERANETO_ATRASADOS_INTCOMINODEVENGADOS = 'Intereses y Comisiones no Devengados';
    public readonly FORM2C_AC_CARTERANETO_ATRASADOS_TOTAL = 'TOTAL DE CRÉDITOS ATRASADOS';
    //  TOTAL CARTERA DE CRÉDITOS NETOS
    public readonly FORM2C_AC_CARTERANETO_TOTAL = 'TOTAL';
    //  OTROS ACTIVOS CORRIENTES (*)
    public readonly FORM2C_AC_OTROSCORRIENTES_TOTAL = 'TOTAL';
    // ACTIVOS NO CORRIENTES
    //  CARTERA DE CRÉDITOS NETOS (*)
    //      Vigentes
    public readonly FORM2C_ANC_CARTERANETOS_VIG_CUENTASCORRIENTES = 'Cuentas Corrientes';
    public readonly FORM2C_ANC_CARTERANETOS_VIG_TARJETACREDITO = 'Tarjetas de Crédito';
    public readonly FORM2C_ANC_CARTERANETOS_VIG_DESCUENTOS = 'Descuentos';
    public readonly FORM2C_ANC_CARTERANETOS_VIG_FACTORING = 'Factoring';
    public readonly FORM2C_ANC_CARTERANETOS_VIG_PRESTAMOS = 'Préstamos';
    public readonly FORM2C_ANC_CARTERANETOS_VIG_ARRENFINANC = 'Arrendamiento Financiero';
    public readonly FORM2C_ANC_CARTERANETOS_VIG_HIPVIVIENDA = 'Hipotecarios para Vivienda';
    public readonly FORM2C_ANC_CARTERANETOS_VIG_COMEREXTERIOR = 'Comercio Exterior';
    public readonly FORM2C_ANC_CARTERANETOS_VIG_CREDLIQUIDAR = 'Créditos por Liquidar';
    public readonly FORM2C_ANC_CARTERANETOS_VIG_OTROS = 'Otros';
    public readonly FORM2C_ANC_CARTERANETOS_VIG_TOTAL = 'TOTAL CARTERA DE CRÉDITOS VIGENTES';
    //      Refinanciados y Reestructurados
    public readonly FORM2C_ANC_CARTERANETOS_REFINANREESTRUC = 'Refinanciados y Reestructurados';
    //      Atrasados
    public readonly FORM2C_ANC_CARTERANETOS_ATRASADOS_VENCIDOS = 'Vencidos';
    public readonly FORM2C_ANC_CARTERANETOS_ATRASADOS_COBRAJUDICIAL = 'En Cobranza Judicial';
    public readonly FORM2C_ANC_CARTERANETOS_ATRASADOS_PROVISIONES = 'Provisiones';
    public readonly FORM2C_ANC_CARTERANETOS_ATRASADOS_INTCOMINODEVENGADOS = 'Intereses y Comisiones no Devengados';
    public readonly FORM2C_ANC_CARTERANETOS_ATRASADOS_TOTAL = 'TOTAL DE CRÉDITOS ATRASADOS';
    //  TOTAL CARTERA DE CRÉDITOS NETOS (*)
    public readonly FORM2C_ANC_CARTERANETOS_TOTAL = 'TOTAL';
    //  OTROS ACTIVOS CORRIENTES (*)
    public readonly FORM2C_ANC_OTROSCORRIENTES_TOTAL = 'TOTAL';
    // PASIVOS CORRIENTES
    //  OTROS PASIVOS CORRIENTES (*)
    public readonly FORM2C_PC_OTROS_TOTAL = 'TOTAL';
    // PASIVOS NO CORRIENTES
    //  OTROS PASIVOS NO CORRIENTES (*)
    public readonly FORM2C_PNC_OTROS_TOTAL = 'TOTAL';
    // Formulario 3
    // -----------------------------------------------------------------
    // ESTRUCTURA DE LOS CRÉDITOS DIRECTOS POR MODALIDAD
    public readonly FORM3_ESTRUCCREDDIRECMOD_CUENTASCORRIENTES = 'Cuentas Corrientes';
    public readonly FORM3_ESTRUCCREDDIRECMOD_TARJETASCREDITO = 'Tarjetas de Crédito';
    public readonly FORM3_ESTRUCCREDDIRECMOD_DESCUENTOS = 'Descuentos';
    public readonly FORM3_ESTRUCCREDDIRECMOD_PRESTAMOS = 'Préstamos';
    public readonly FORM3_ESTRUCCREDDIRECMOD_HIPOVIVIENDA = 'Hipotecarios para Vivienda';
    public readonly FORM3_ESTRUCCREDDIRECMOD_FACTORING = 'Fáctoring';
    public readonly FORM3_ESTRUCCREDDIRECMOD_ARRENDAFINANC = 'Arrendamiento Financiero';
    public readonly FORM3_ESTRUCCREDDIRECMOD_COMERCIOEXTERIOR = 'Comercio Exterior';
    public readonly FORM3_ESTRUCCREDDIRECMOD_OTROS = 'Otros';
    public readonly FORM3_ESTRUCCREDDIRECMOD_TOTAL = 'Total (*)';
    // ESTRUCTURA DE LOS CRÉDITOS INDIRECTOS
    public readonly FORM3_ESTRUCCREDINDIREC_AVALES = 'Avales';
    public readonly FORM3_ESTRUCCREDINDIREC_CARTASFIANZAS = 'Cartas Fianzas';
    public readonly FORM3_ESTRUCCREDINDIREC_CARTASCREDITO = 'Cartas de Crédito';
    public readonly FORM3_ESTRUCCREDINDIREC_ACEPBANCARIA = 'Aceptaciones Bancarias';
    public readonly FORM3_ESTRUCCREDINDIREC_LINEASCRED = 'Lineas de Crédito no utilizadas y Créditos concedidos no desembolsados';
    public readonly FORM3_ESTRUCCREDINDIREC_TOTAL = 'Total (**)';
    // Formulario 4 - ESTRUCTURA DE LOS CRÉDITOS DIRECTOS SEGÚN TIPO Y MODALIDAD
    // -----------------------------------------------------------------
    public readonly FORM4_TOTAL_CREDCORPORATIVOS = 'Créditos Corporativos (Sub-Total)';
    public readonly FORM4_TOTAL_CREDGRANDESEMPRESAS = 'Créditos a grandes empresas (Sub-Total)';
    public readonly FORM4_TOTAL_CREDMEDIANASEMPRESAS = 'Créditos a medianas empresas (Sub-Total)';
    public readonly FORM4_TOTAL_CREDPEQUENIASEMPRESAS = 'Créditos pequeñas empresas (Sub-Total)';
    public readonly FORM4_TOTAL_CREDMICROEMPRESAS = 'Créditos a microempresas (Sub-Total)';
    public readonly FORM4_TOTAL_CREDCONSUMO = 'Créditos de consumo (Sub-Total)';
    public readonly FORM4_TOTAL_CREDHIPOVIVIENDA = 'Créditos hipotecarios para vivienda (Sub-Total)';
    public readonly FORM4_TOTAL_CREDDIRECTO = 'Total Créditos Directos (en %)';
    public readonly FORM4_TOTAL_CREDDIRECTOSOLES = 'Total Créditos Directos (En Miles S/.) (*)';

    public readonly FORM4_TARJETACREDITO = 'Tarjetas de crédito';
    public readonly FORM4_DESCUENTOS = 'Descuentos';
    public readonly FORM4_PRESTAMOS = 'Préstamos';
    public readonly FORM4_FACTORING = 'Factoring';
    public readonly FORM4_ARRENFINANC = 'Arrendamiento financiero y Lease-back';
    public readonly FORM4_COMERCIOEXTERIOR = 'Comercio exterior';
    public readonly FORM4_OTROS = 'Otros';
    public readonly FORM4_PRESTAMOSREVOLVENTES = 'Préstamos revolventes';
    public readonly FORM4_PRESTAMOSNOREVOLVENTES = 'Préstamos no revolventes';
    public readonly FORM4_PRESTAMOSAUTOS = 'Préstamos autos';
    public readonly FORM4_PRESTAMOSMIVIVIENDA = 'Préstamos Mivivienda';

    // Formulario 5 - MOROSIDAD SEGÚN TIPO Y MODALIDAD DE CRÉDITO
    // -----------------------------------------------------------------
    public readonly FORM5_TOTAL_CREDCORPORATIVOS = 'Créditos Corporativos';
    public readonly FORM5_TOTAL_CREDGRANDESEMPRESAS = 'Créditos a grandes empresas';
    public readonly FORM5_TOTAL_CREDMEDIANASEMPRESAS = 'Créditos a medianas empresas';
    public readonly FORM5_TOTAL_CREDPEQUENIASEMPRESAS = 'Créditos pequeñas empresas';
    public readonly FORM5_TOTAL_CREDMICROEMPRESAS = 'Créditos a microempresas';
    public readonly FORM5_TOTAL_CREDCONSUMO = 'Créditos de consumo';
    public readonly FORM5_TOTAL_CREDHIPOVIVIENDA = 'Créditos hipotecarios para vivienda';

    public readonly FORM5_TARJETACREDITO = 'Tarjetas de crédito';
    public readonly FORM5_DESCUENTOS = 'Descuentos';
    public readonly FORM5_PRESTAMOS = 'Préstamos';
    public readonly FORM5_FACTORING = 'Factoring';
    public readonly FORM5_ARRENFINANC = 'Arrendamiento financiero y Lease-back';
    public readonly FORM5_COMERCIOEXTERIOR = 'Comercio exterior';
    public readonly FORM5_OTROS = 'Otros';
    public readonly FORM5_PRESTAMOSREVOLVENTES = 'Préstamos revolventes';
    public readonly FORM5_PRESTAMOSNOREVOLVENTES = 'Préstamos no revolventes';
    public readonly FORM5_PRESTAMOSAUTOS = 'Préstamos autos';
    public readonly FORM5_PRESTAMOSMIVIVIENDA = 'Préstamos Mivivienda';
    // Formulario 6 - CRÉDITOS DIRECTOS POR TIPO DE CRÉDITO Y SECTOR ECONÓMICO
    // -----------------------------------------------------------------
    // CRÉDITOS CORPORATIVOS, GRANDES, MEDIANAS, PEQUEÑAS Y A MICROEMPRESAS
    public readonly FORM6_DIRECTIPOCREDSECTECO_AGRICULTURA = 'Agricultura, Ganadería, Caza y Silvicutura';
    public readonly FORM6_DIRECTIPOCREDSECTECO_PESCA = 'Pesca';
    public readonly FORM6_DIRECTIPOCREDSECTECO_MINERIA = 'Minería';
    public readonly FORM6_DIRECTIPOCREDSECTECO_INDMANUFACTURERA = 'Industria Manufacturera';
    public readonly FORM6_DIRECTIPOCREDSECTECO_ALIMENTOS = 'Alimentos bebidas y tabaco';
    public readonly FORM6_DIRECTIPOCREDSECTECO_TEXTILES = 'Textiles y cueros';
    public readonly FORM6_DIRECTIPOCREDSECTECO_MADERA = 'Madera y papel';
    public readonly FORM6_DIRECTIPOCREDSECTECO_FABSUSTANCIASQUIMICAS = 'Fab. de sustancias y productos químicos';
    public readonly FORM6_DIRECTIPOCREDSECTECO_FABPRODUCTOSCAUCHO = 'Fab. de productos de caucho y plástico';
    public readonly FORM6_DIRECTIPOCREDSECTECO_FABPRODUCTOSMINERALES = 'Fab. de productos minerales no metálicos';
    public readonly FORM6_DIRECTIPOCREDSECTECO_FABMETALES = 'Fab. de metales';
    public readonly FORM6_DIRECTIPOCREDSECTECO_MAQUINARIA = 'Maquinaria y equipo';
    public readonly FORM6_DIRECTIPOCREDSECTECO_FABVEHICULOSTRANSPORTE = 'Fab. de vehículos y equipos de transporte';
    public readonly FORM6_DIRECTIPOCREDSECTECO_RESTOMANUFACTURA = 'Resto manufactura';
    public readonly FORM6_DIRECTIPOCREDSECTECO_ELECGASAGUA = 'Electricidad, Gas y Agua';
    public readonly FORM6_DIRECTIPOCREDSECTECO_CONSTRUCCION = 'Construcción';
    public readonly FORM6_DIRECTIPOCREDSECTECO_COMERCIO = 'Comercio';
    public readonly FORM6_DIRECTIPOCREDSECTECO_VENTAREPARACIONVEHICULOS = 'Venta y reparación de vehículos';
    public readonly FORM6_DIRECTIPOCREDSECTECO_COMERCIOMAYOR = 'Comercio al por mayor';
    public readonly FORM6_DIRECTIPOCREDSECTECO_COMERCIOMENOR = 'Comercio al por menor';
    public readonly FORM6_DIRECTIPOCREDSECTECO_HOTELESRESTAURANTES = 'Hoteles y Restaurantes';
    public readonly FORM6_DIRECTIPOCREDSECTECO_TRANSPORTEALMCOMUNI = 'Transporte, Almacenamiento y Comunicaciones';
    public readonly FORM6_DIRECTIPOCREDSECTECO_INTERFINANCIERA = 'Intermediación Financiera';
    public readonly FORM6_DIRECTIPOCREDSECTECO_ACTINMOBILIARIASEMPRALQUI = 'Actividades Inmobiliarias, Empresariales y de Alquiler';
    public readonly FORM6_DIRECTIPOCREDSECTECO_ACTINMOBILIARIASALQUI = 'Act. inmobiliaria y de alquiler';
    public readonly FORM6_DIRECTIPOCREDSECTECO_ACTEMPRESARIAL = 'Act. empresarial';
    public readonly FORM6_DIRECTIPOCREDSECTECO_ADMINISTRACIONPUBLICA = 'Administracion Pública y de Defensa';
    public readonly FORM6_DIRECTIPOCREDSECTECO_ENSEÑANZA = 'Enseñanza';
    public readonly FORM6_DIRECTIPOCREDSECTECO_SERVSOCIALESSALUD = 'Servicios Sociales y de Salud';
    public readonly FORM6_DIRECTIPOCREDSECTECO_OTRASACTIVIDADES = 'Otras Actividades de servicios comunitarios';
    public readonly FORM6_DIRECTIPOCREDSECTECO_HOGARESPRIVADOS = 'Hogares privados c/ serv. doméstico y Órganos Extraterritoriales';
    public readonly FORM6_DIRECTIPOCREDSECTECO_TOTAL = 'TOTAL';
    // CRÉDITOS HIPOTECARIOS PARA VIVIENDA
    public readonly FORM6_CREDITOSHIPOTECARIOSVIVIENDA = 'CRÉDITOS HIPOTECARIOS PARA VIVIENDA';
    // CRÉDITOS DE CONSUMO
    public readonly FORM6_CREDITOSCONSUMO = 'CRÉDITOS DE CONSUMO';
    // TOTAL CREDITOS
    public readonly FORM6_TOTALCREDITOS = 'TOTAL CRÉDITOS (*)';

    // Codigos
    // Formulario 1 - ESTADO DE RESULTADOS(*)
    // -----------------------------------------------------------------
    // INGRESOS POR INTERESES
    public readonly FORM1_COD_INGINT_DISPONIBLE = 'ff1_ingintdisponible';
    public readonly FORM1_COD_INGINT_FONDOINTER = 'ff1_ingintfondointer';
    public readonly FORM1_COD_INGINT_INVVALORCAMRESUL = 'ff1_ingintinvvalorcamresul';
    public readonly FORM1_COD_INGINT_DISPONIBLEVENTA = 'ff1_ingintdisponibleventa';
    public readonly FORM1_COD_INGINT_VENCIMIENTO = 'ff1_ingintvencimiento';
    public readonly FORM1_COD_INGINT_CREDDIRECTOS = 'ff1_ingintcreddirectos';
    public readonly FORM1_COD_INGINT_OPECOBERTURA = 'ff1_ingintopecobertura';
    public readonly FORM1_COD_INGINT_CUENTAS = 'ff1_ingintcuentas';
    public readonly FORM1_COD_INGINT_OTROS = 'ff1_ingintotros';
    public readonly FORM1_COD_INGINT_TOTAL = 'ff1_inginttotal';
    // GASTOS POR INTERESES
    public readonly FORM1_COD_GASINT_OBLIGPUBLICO = 'ff1_gasintobligpublico';
    public readonly FORM1_COD_GASINT_FONDOINTER = 'ff1_gasintfondointer';
    public readonly FORM1_COD_GASINT_DEPOSISFINAN = 'ff1_gasintdeposisfinan';
    public readonly FORM1_COD_GASINT_ADEUDOSOBLIG = 'ff1_gasintadeudosoblig';
    public readonly FORM1_COD_GASINT_DIFCAMBIO = 'ff1_gasintdifcambio';
    public readonly FORM1_COD_GASINT_CUENTASPAGAR = 'ff1_gasintcuentaspagar';
    public readonly FORM1_COD_GASINT_RESULOPECOBER = 'ff1_gasintresulopecober';
    public readonly FORM1_COD_GASINT_OTROSGASFINAN = 'ff1_gasintotrosgasfinan';
    public readonly FORM1_COD_GASINT_TOTAL = 'ff1_gasinttotal';
    // TOTAL MARGEN FINANCIERO BRUTO
    public readonly FORM1_COD_MARGENFINANBRUTO = 'ff1_totalmargenfinanbruto';
    // PROVISIONES PARA CRÉDITOS DIRECTOS (1)
    public readonly FORM1_COD_PROCREDIR = 'ff1_pro';
    public readonly FORM1_COD_PROCREDIR_TOTAL = 'ff1_totalprocredir';
    // TOTAL MARGEN FINANCIERO BRUTO (DESPUÉS DE PROVISIONES)
    public readonly FORM1_COD_MARGENFINANBRUTODESPPROV = 'ff1_totalmargenfinanbrutodespprov';
    // INGRESOS POR SERVICIOS FINANCIEROS
    public readonly FORM1_COD_INGSERFIN_CREDINDI = 'ff1_ingserfincredini';
    public readonly FORM1_COD_INGSERFIN_FIDEICOMISIONES = 'ff1_ingserfinfideicomisiones';
    public readonly FORM1_COD_INGSERFIN_EMISIONELEC = 'ff1_ingserfinemisionelec';
    public readonly FORM1_COD_INGSERFIN_DIVERSOS = 'ff1_ingserfindiversos';
    public readonly FORM1_COD_INGSERFIN_TOTAL = 'ff1_ingserfintotal';
    // GASTOS POR SERVICIOS FINANCIEROS
    public readonly FORM1_COD_GASSERFIN_CREDINDI = 'ff1_gasserfincredindi';
    public readonly FORM1_COD_GASSERFIN_FIDEICOMISIONES = 'ff1_gasserfinfideicomisiones';
    public readonly FORM1_COD_GASSERFIN_PRIMASFONSEGDEPO = 'ff1_gasserfinprmasfonsegdepo';
    public readonly FORM1_COD_GASSERFIN_DIVERSOS = 'ff1_gasserfindiversos';
    public readonly FORM1_COD_GASSERFIN_TOTAL = 'ff1_gasserfintotal';
    // TOTAL MARGEN FINANCIERO NETO DE INGRESOS Y GASTOS POR SERVICIOS FINANCIEROS
    public readonly FORM1_COD_MARGENFINANNETOGASSERVFINAN = 'ff1_totalmargenfinannetogasservfinan';
    // ROF
    public readonly FORM1_COD_ROF = 'ff1_rof';
    // TOTAL MARGEN OPERACIONAL
    public readonly FORM1_COD_MARGENOPERACIONAL = 'ff1_totalmargenope';
    // GASTOS DE ADMINISTRACIÓN
    public readonly FORM1_COD_GASTOSADMIN_PERSONAL = 'ff1_gastosadminpersonal';
    public readonly FORM1_COD_GASTOSADMIN_DIRECTORIO = 'ff1_gastosadmindirectorio';
    public readonly FORM1_COD_GASTOSADMIN_SERVICIOS = 'ff1_gastosadminservicios';
    public readonly FORM1_COD_GASTOSADMIN_IMPUESTOS = 'ff1_gastosadminimpuestos';
    public readonly FORM1_COD_GASTOSADMIN_TOTAL = 'ff1_gastosadmintotal';
    // DEPRECIACIONES Y AMORTIZACIONES
    public readonly FORM1_COD_DEPRECIACIONES_AMORTIZACIONES = 'ff1_depreamortiza';
    // TOTAL MARGEN OPERACIONAL NETO
    public readonly FORM1_COD_MARGENOPERACIONALNETO = 'ff1_totalmargenopeneto';
    // VALUACIÓN DE ACTIVOS Y PROVISIONES
    public readonly FORM1_COD_VALUACIONACTPROV = 'ff1_valuacionactprov';
    // TOTAL RESULTADO DE OPERACIÓN
    public readonly FORM1_COD_RESULOPE = 'ff1_totalresulope';
    // OTROS INGRESOS (1)
    public readonly FORM1_COD_OTROSING = 'ff1_oti';
    public readonly FORM1_COD_OTROSING_TOTAL = 'ff1_totalotrosing';
    // OTROS GASTOS (1)
    public readonly FORM1_COD_OTROSGAS = 'ff1_otg';
    public readonly FORM1_COD_OTROSGAS_TOTAL = 'ff1_totalotrosgas';
    // TOTAL OTROS INGRESOS Y OTROS GASTOS
    public readonly FORM1_COD_OTROSING_OTROSGAS_TOTAL = 'ff1_totalotrosinggas';
    // TOTAL RESULTADO ANTES DE IMPUESTO A LA RENTA
    public readonly FORM1_COD_RESULTADO_IMPUESTORENTA = 'ff1_totalresulimprenta';
    // IMPUESTO A LA RENTA
    public readonly FORM1_COD_IMPRENTA_IMPUESTO = 'ff1_impimpuesto';
    // TOTAL RESULTADO NETO DEL EJERCICIO
    public readonly FORM1_COD_RESULTADONETOEJERCICIO = 'ff1_totalresulnetoejer';

    // Formulario 2 - ESTADO DE SITUACIÓN FINANCIERA(*)
    // -----------------------------------------------------------------
    // ACTIVO CORRIENTE
    public readonly FORM2_COD_AC_DISPONIBLE = 'ff2_acdisponible';
    public readonly FORM2_COD_AC_FONDOSINTERBANCARIOS = 'ff2_acfondointerbancario';
    public readonly FORM2_COD_AC_INVCAMBIORESUL = 'ff2_acinvcambioresul';
    public readonly FORM2_COD_AC_INVDISPONIBLEVENTA = 'ff2_acinvdispoventa';
    public readonly FORM2_COD_AC_INVVENCIMIENTO = 'ff2_acinvvenc';
    public readonly FORM2_COD_AC_CARTERACREDNETOS = 'ff2_accarteracrednetos';
    public readonly FORM2_COD_AC_CARTERACREDVIG = 'ff2_accarteracredvig';
    public readonly FORM2_COD_AC_CARTERACREDREEST = 'ff2_accarteracredest';
    public readonly FORM2_COD_AC_CARTERACREDREFIN = 'ff2_accarteracredfin';
    public readonly FORM2_COD_AC_CARTERACREDVENC = 'ff2_accarteracredvenc';
    public readonly FORM2_COD_AC_CARTERACREDCOBRA = 'ff2_accarteracredcobra';
    public readonly FORM2_COD_AC_PROVCRED = 'ff2_acprovcred';
    public readonly FORM2_COD_AC_DERIVADOSNEGOC = 'ff2_acderivadosnegoc';
    public readonly FORM2_COD_AC_DEVIVADOSCOBER = 'ff2_acderivadoscober';
    public readonly FORM2_COD_AC_CUENTASCOBRAR = 'ff2_accuentascobrar';
    public readonly FORM2_COD_AC_IMPCORRIENTES = 'ff2_acimpcorrientes';
    public readonly FORM2_COD_AC_OTROS = 'ff2_acotros';
    public readonly FORM2_COD_AC_TOTAL = 'ff2_actotal';
    // ACTIVO NO CORRIENTE
    public readonly FORM2_COD_ANC_CATERACREDNETOS = 'ff2_anccarteracrednetos';
    public readonly FORM2_COD_ANC_CARTERACREDVIG = 'ff2_anccarteracredvig';
    public readonly FORM2_COD_ANC_CARTERACREDREEST = 'ff2_anccarteracredreest';
    public readonly FORM2_COD_ANC_CARTERACREDREFIN = 'ff2_anccarteracredrefin';
    public readonly FORM2_COD_ANC_CARTERACREDVENC = 'ff2_anccarteracredvenc';
    public readonly FORM2_COD_ANC_CARTERACREDCOBRANZA = 'ff2_anccarteracredcobranza';
    public readonly FORM2_COD_ANC_PROVCREDITOS = 'ff2_ancprovcreditos';
    public readonly FORM2_COD_ANC_BIENES = 'ff2_ancbienes';
    public readonly FORM2_COD_ANC_PARTICIPACIONES = 'ff2_ancparticipaciones';
    public readonly FORM2_COD_ANC_INMMOBEQUIPONETO = 'ff2_ancinmobequiponeto';
    public readonly FORM2_COD_ANC_ACTIVOSINTANGIBLES = 'ff2_ancactivosintagibles';
    public readonly FORM2_COD_ANC_IMPCORRIENTES = 'ff2_ancimpcorrientes';
    public readonly FORM2_COD_ANC_IMPDIFERIDO = 'ff2_ancimpdiferido';
    public readonly FORM2_COD_ANC_MANTENIDOSVENTA = 'ff2_ancmantenidosventa';
    public readonly FORM2_COD_ANC_OTROS = 'ff2_ancotros';
    public readonly FORM2_COD_ANC_TOTAL = 'ff2_anctotal';
    // TOTAL ACTIVO
    public readonly FORM2_COD_TOTALACTIVO = 'ff2_totalactivo';
    // PASIVO CORRIENTE
    public readonly FORM2_COD_PC_OBLIGPUBLICO = 'ff2_pcobligpublico';
    public readonly FORM2_COD_PC_FONDOSINTER = 'ff2_pcfondosinter';
    public readonly FORM2_COD_PC_DEPSISFINANCIERO = 'ff2_pcdepsisfinanciero';
    public readonly FORM2_COD_PC_ADEUDOSOBLIGFINAN = 'ff2_pcadeudosobligfinan';
    public readonly FORM2_COD_PC_DERIVADOSNEGOC = 'ff2_pcderivadosnegoc';
    public readonly FORM2_COD_PC_DERIVADOSCOBER = 'ff2_pcderivadoscober';
    public readonly FORM2_COD_PC_CUENTASPAGAR = 'ff2_pccuentaspagar';
    public readonly FORM2_COD_PC_PROVISIONES = 'ff2_pcprovisiones';
    public readonly FORM2_COD_PC_IMPCORRIENTES = 'ff2_pcimpcorrientes';
    public readonly FORM2_COD_PC_IMPDIFERIDO = 'ff2_pcimpdiferido';
    public readonly FORM2_COD_PC_OTROS = 'ff2_pcotros';
    public readonly FORM2_COD_PC_TOTAL = 'ff2_pctotal';
    // PASIVO NO CORRIENTE
    public readonly FORM2_COD_PNC_OBLIGPUBLICO = 'ff2_pncobligpublico';
    public readonly FORM2_COD_PNC_DEPSISFINANCIERO = 'ff2_pncdesisfinanciero';
    public readonly FORM2_COD_PNC_ADEUDOSOBLIGFINAN = 'ff2_pncadeudosobligfinan';
    public readonly FORM2_COD_PNC_IMPDIFERIDO = 'ff2_pncimpdiferido';
    public readonly FORM2_COD_PNC_PROVISIONES = 'ff2_pncprovisiones';
    public readonly FORM2_COD_PNC_OTROS = 'ff2_pncotros';
    public readonly FORM2_COD_PNC_TOTAL = 'ff2_pnctotal';
    // TOTAL PASIVO
    public readonly FORM2_COD_TOTALPASIVO = 'ff2_totalpasivo';
    // PATRIMONIO
    public readonly FORM2_COD_PAT_CAPITALSOCIAL = 'ff2_patcapitalsocial';
    public readonly FORM2_COD_PAT_CAPITALADICIONAL = 'ff2_patcapitaladicional';
    public readonly FORM2_COD_PAT_RESERVAS = 'ff2_patreservas';
    public readonly FORM2_COD_PAT_AJUSTESPATRIMONIO = 'ff2_patajustespatrimonio';
    public readonly FORM2_COD_PAT_RESULACUMULADOS = 'ff2_patresulacumulados';
    public readonly FORM2_COD_PAT_RESULNETOEJERCICIO = 'ff2_patresulnetoejercicio';
    public readonly FORM2_COD_PAT_TOTALPATRIMONIO = 'ff2_pattotal';
    // TOTAL PASIVO Y PATRIMONIO
    public readonly FORM2_COD_TOTALPASIVOPATRIMONIO = 'ff2_totalpasivopatrimonio';
    // Formulario 2 - ANEXO 2C - DETALLE DE CUENTAS
    // -----------------------------------------------------------------
    // ACTIVOS CORRIENTES
    //  DISPONIBLE
    public readonly FORM2C_COD_AC_DISPONIBLE_CAJA = 'ff2c_acdispcaja';
    public readonly FORM2C_COD_AC_DISPONIBLE_BCRP = 'ff2c_acdispbcrp';
    public readonly FORM2C_COD_AC_DISPONIBLE_BANCOTRASEMPFINAN = 'ff2c_acdispbancotrasempfinan';
    public readonly FORM2C_COD_AC_DISPONIBLE_BANCOINSTIFINAN = 'ff2c_acdispbancoinstifinan';
    public readonly FORM2C_COD_AC_DISPONIBLE_CANJE = 'ff2c_acdispcanje';
    public readonly FORM2C_COD_AC_DISPONIBLE_OTROSDISP = 'ff2c_acdispotrosdisp';
    public readonly FORM2C_COD_AC_DISPONIBLE_TOTAL = 'ff2c_acdisptotal';
    //  CARTERA DE CRÉDITOS NETOS (*)
    //      Vigentes
    public readonly FORM2C_COD_AC_CARTERANETO_VIG_CUENTASCORRIENTES = 'ff2c_accarteranetovigcuentascorrientes';
    public readonly FORM2C_COD_AC_CARTERANETO_VIG_TARJETACREDITO = 'ff2c_accarteranetovigtarjetacredito';
    public readonly FORM2C_COD_AC_CARTERANETO_VIG_DESCUENTOS = 'ff2c_accarteranetovigdescuentos';
    public readonly FORM2C_COD_AC_CARTERANETO_VIG_FACTORING = 'ff2c_accarteranetovigfactoring';
    public readonly FORM2C_COD_AC_CARTERANETO_VIG_PRESTAMOS = 'ff2c_accarteranetovigprestamos';
    public readonly FORM2C_COD_AC_CARTERANETO_VIG_ARRENFINANC = 'ff2c_accarteranetovigarrenfinanc';
    public readonly FORM2C_COD_AC_CARTERANETO_VIG_HIPVIVIENDA = 'ff2c_accarteranetovighipvivienda';
    public readonly FORM2C_COD_AC_CARTERANETO_VIG_COMEREXTERIOR = 'ff2c_accarteranetovigcomerexterior';
    public readonly FORM2C_COD_AC_CARTERANETO_VIG_CREDLIQUIDAR = 'ff2c_accarteranetovigcredliquidar';
    public readonly FORM2C_COD_AC_CARTERANETO_VIG_OTROS = 'ff2c_accarteranetovigotros';
    public readonly FORM2C_COD_AC_CARTERANETO_VIG_TOTAL = 'ff2c_accarteranetovigtotal';
    //      Refinanciados y Reestructurados
    public readonly FORM2C_COD_AC_CARTERANETO_REFINANREESTRUC = 'ff2c_accarteranetorefinanreestruc';
    //      Atrasados
    public readonly FORM2C_COD_AC_CARTERANETO_ATRASADOS_VENCIDOS = 'ff2c_accarteranetoatrasadosvencidos';
    public readonly FORM2C_COD_AC_CARTERANETO_ATRASADOS_COBRAJUDICIAL = 'ff2c_accarteranetoatrasadoscibrajudicial';
    public readonly FORM2C_COD_AC_CARTERANETO_ATRASADOS_PROVISIONES = 'ff2c_accarteranetoatrasadosprovisiones';
    public readonly FORM2C_COD_AC_CARTERANETO_ATRASADOS_INTCOMINODEVENGADOS = 'ff2c_accarteranetoatrasadosintcominodevengados';
    public readonly FORM2C_COD_AC_CARTERANETO_ATRASADOS_TOTAL = 'ff2c_accarteranetoatrasadostotal';
    //  TOTAL CARTERA DE CRÉDITOS NETOS
    public readonly FORM2C_COD_AC_CARTERANETO_TOTAL = 'ff2c_accarteranetototal';
    //  OTROS ACTIVOS CORRIENTES (*)
    public readonly FORM2C_COD_AC_OTROSCORRIENTES = 'ff2c_acotros';
    public readonly FORM2C_COD_AC_OTROSCORRIENTES_TOTAL = 'ff2c_acotrostotal';
    // ACTIVOS NO CORRIENTES
    //  CARTERA DE CRÉDITOS NETOS (*)
    //      Vigentes
    public readonly FORM2C_COD_ANC_CARTERANETOS_VIG_CUENTASCORRIENTES = 'ff2c_anccarteranetosvigcuentascorrientes';
    public readonly FORM2C_COD_ANC_CARTERANETOS_VIG_TARJETACREDITO = 'ff2c_anccarteranetosvigtarjetacredito';
    public readonly FORM2C_COD_ANC_CARTERANETOS_VIG_DESCUENTOS = 'ff2c_anccarteranetosvigdescuentos';
    public readonly FORM2C_COD_ANC_CARTERANETOS_VIG_FACTORING = 'ff2c_anccarteranetosvigfactoring';
    public readonly FORM2C_COD_ANC_CARTERANETOS_VIG_PRESTAMOS = 'ff2c_anccarteranetosvigprestamos';
    public readonly FORM2C_COD_ANC_CARTERANETOS_VIG_ARRENFINANC = 'ff2c_anccarteranetosvigarrenfinanc';
    public readonly FORM2C_COD_ANC_CARTERANETOS_VIG_HIPVIVIENDA = 'ff2c_anccarteranetosvighipvivienda';
    public readonly FORM2C_COD_ANC_CARTERANETOS_VIG_COMEREXTERIOR = 'ff2c_anccarteranetosvigcomerexterior';
    public readonly FORM2C_COD_ANC_CARTERANETOS_VIG_CREDLIQUIDAR = 'ff2c_anccarteranetosvigcredliquidar';
    public readonly FORM2C_COD_ANC_CARTERANETOS_VIG_OTROS = 'ff2c_anccarteranetosvigotros';
    public readonly FORM2C_COD_ANC_CARTERANETOS_VIG_TOTAL = 'ff2c_anccarteranetosvigtotal';
    //      Refinanciados y Reestructurados
    public readonly FORM2C_COD_ANC_CARTERANETOS_REFINANREESTRUC = 'ff2c_anccarteranetosrefinanreestruc';
    //      Atrasados
    public readonly FORM2C_COD_ANC_CARTERANETOS_ATRASADOS_VENCIDOS = 'ff2c_anccarteranetos';
    public readonly FORM2C_COD_ANC_CARTERANETOS_ATRASADOS_COBRAJUDICIAL = 'ff2c_anccarteranetos';
    public readonly FORM2C_COD_ANC_CARTERANETOS_ATRASADOS_PROVISIONES = 'ff2c_anccarteranetos';
    public readonly FORM2C_COD_ANC_CARTERANETOS_ATRASADOS_INTCOMINODEVENGADOS = 'ff2c_anccarteranetos';
    public readonly FORM2C_COD_ANC_CARTERANETOS_ATRASADOS_TOTAL = 'ff2c_anccarteranetos';
    //  TOTAL CARTERA DE CRÉDITOS NETOS (*)
    public readonly FORM2C_COD_ANC_CARTERANETOS_TOTAL = 'ff2c_anccarteranetostotal';
    //  OTROS ACTIVOS CORRIENTES (*)
    public readonly FORM2C_COD_ANC_OTROSCORRIENTES = 'ff2c_ancotros';
    public readonly FORM2C_COD_ANC_OTROSCORRIENTES_TOTAL = 'ff2c_ancotrostotal';
    // PASIVOS CORRIENTES
    //  OTROS PASIVOS CORRIENTES (*)
    public readonly FORM2C_COD_PC_OTROS = 'ff2c_pcotros';
    public readonly FORM2C_COD_PC_OTROS_TOTAL = 'ff2c_pcotrostotal';
    // PASIVOS NO CORRIENTES
    //  OTROS PASIVOS NO CORRIENTES (*)
    public readonly FORM2C_COD_PNC_OTROS = 'ff2c_pncotros';
    public readonly FORM2C_COD_PNC_OTROS_TOTAL = 'ff2c_pncotrostotal';
    // Formulario 3
    // -----------------------------------------------------------------
    // ESTRUCTURA DE LOS CRÉDITOS DIRECTOS POR MODALIDAD
    public readonly FORM3_COD_ESTRUCCREDDIRECMOD_CUENTASCORRIENTES = 'ff3_estruccreddirecmodcuentascorrientes';
    public readonly FORM3_COD_ESTRUCCREDDIRECMOD_TARJETASCREDITO = 'ff3_estruccreddirecmodtarjetascredito';
    public readonly FORM3_COD_ESTRUCCREDDIRECMOD_DESCUENTOS = 'ff3_estruccreddirecmoddescuentos';
    public readonly FORM3_COD_ESTRUCCREDDIRECMOD_PRESTAMOS = 'ff3_estruccreddirecmodprestamos';
    public readonly FORM3_COD_ESTRUCCREDDIRECMOD_HIPOVIVIENDA = 'ff3_estruccreddirecmodhipvivienda';
    public readonly FORM3_COD_ESTRUCCREDDIRECMOD_FACTORING = 'ff3_estruccreddirecmodfactoring';
    public readonly FORM3_COD_ESTRUCCREDDIRECMOD_ARRENDAFINANC = 'ff3_estruccreddirecmodarrendafinan';
    public readonly FORM3_COD_ESTRUCCREDDIRECMOD_COMERCIOEXTERIOR = 'ff3_estruccreddirecmodcomercioexterior';
    public readonly FORM3_COD_ESTRUCCREDDIRECMOD_OTROS = 'ff3_estruccreddirecmodotros';
    public readonly FORM3_COD_ESTRUCCREDDIRECMOD_TOTAL = 'ff3_estruccreddirecmodtotal';
    // ESTRUCTURA DE LOS CRÉDITOS INDIRECTOS
    public readonly FORM3_COD_ESTRUCCREDINDIREC_AVALES = 'ff3_estruccredindirecavales';
    public readonly FORM3_COD_ESTRUCCREDINDIREC_CARTASFIANZAS = 'ff3_estruccredindireccartasfianza';
    public readonly FORM3_COD_ESTRUCCREDINDIREC_CARTASCREDITO = 'ff3_estruccredindireccartascredito';
    public readonly FORM3_COD_ESTRUCCREDINDIREC_ACEPBANCARIA = 'ff3_estruccredindirecacepbancaria';
    public readonly FORM3_COD_ESTRUCCREDINDIREC_LINEASCRED = 'ff3_estruccredindireclineacred';
    public readonly FORM3_COD_ESTRUCCREDINDIREC_TOTAL = 'ff3_estruccredindirectotal';
    // Formulario 4 - ESTRUCTURA DE LOS CRÉDITOS DIRECTOS SEGÚN TIPO Y MODALIDAD
    // -----------------------------------------------------------------
    public readonly FORM4_COD_TOTAL_CREDCORPORATIVOS = 'ff4_totalcredcorporativos';
    public readonly FORM4_COD_TOTAL_CREDGRANDESEMPRESAS = 'ff4_totalcredgrandesempresas';
    public readonly FORM4_COD_TOTAL_CREDMEDIANASEMPRESAS = 'ff4_totalcredmedianasempresas';
    public readonly FORM4_COD_TOTAL_CREDPEQUENIASEMPRESAS = 'ff4_totalcredpequeniasempresas';
    public readonly FORM4_COD_TOTAL_CREDMICROEMPRESAS = 'ff4_totalcredmicroempresas';
    public readonly FORM4_COD_TOTAL_CREDCONSUMO = 'ff4_totalcredconsumo';
    public readonly FORM4_COD_TOTAL_CREDHIPOVIVIENDA = 'ff4_totalcredhipvivienda';
    public readonly FORM4_COD_TOTAL_CREDDIRECTO = 'ff4_totalcreddirecto';
    public readonly FORM4_COD_TOTAL_CREDDIRECTOSOLES = 'ff4_totalcreddirectosoles';

    public readonly FORM4_COD_CREDCORPORATIVOS_TARJETACREDITO = 'ff4_credcorporativostarjetacredito';
    public readonly FORM4_COD_CREDCORPORATIVOS_DESCUENTOS = 'ff4_credcorporativosdescuentos';
    public readonly FORM4_COD_CREDCORPORATIVOS_PRESTAMOS = 'ff4_credcorporativosprestamos';
    public readonly FORM4_COD_CREDCORPORATIVOS_FACTORING = 'ff4_credcorporativosfactoring';
    public readonly FORM4_COD_CREDCORPORATIVOS_ARRENFINANC = 'ff4_credcorporativosarrenfinanc';
    public readonly FORM4_COD_CREDCORPORATIVOS_COMERCIOEXTERIOR = 'ff4_credcorporativoscomercioexterior';
    public readonly FORM4_COD_CREDCORPORATIVOS_OTROS = 'ff4_credcorporativosotros';

    public readonly FORM4_COD_CREDGRANDESEMPRESAS_TARJETACREDITO = 'ff4_credgrandesempresastarjetacredito';
    public readonly FORM4_COD_CREDGRANDESEMPRESAS_DESCUENTOS = 'ff4_credgrandesempresasdescuentos';
    public readonly FORM4_COD_CREDGRANDESEMPRESAS_PRESTAMOS = 'ff4_credgrandesempresasprestamos';
    public readonly FORM4_COD_CREDGRANDESEMPRESAS_FACTORING = 'ff4_credgrandesempresasfactoring';
    public readonly FORM4_COD_CREDGRANDESEMPRESAS_ARRENFINANC = 'ff4_credgrandesempresasarrenfinanc';
    public readonly FORM4_COD_CREDGRANDESEMPRESAS_COMERCIOEXTERIOR = 'ff4_credgrandesempresascomercioexterior';
    public readonly FORM4_COD_CREDGRANDESEMPRESAS_OTROS = 'ff4_credgrandesempresasotros';

    public readonly FORM4_COD_CREDMEDIANASEMPRESAS_TARJETACREDITO = 'ff4_credmedianasemperesastarjetacredito';
    public readonly FORM4_COD_CREDMEDIANASEMPRESAS_DESCUENTOS = 'ff4_credmedianasemperesasdescuentos';
    public readonly FORM4_COD_CREDMEDIANASEMPRESAS_PRESTAMOS = 'ff4_credmedianasemperesasprestamos';
    public readonly FORM4_COD_CREDMEDIANASEMPRESAS_FACTORING = 'ff4_credmedianasemperesasfactoring';
    public readonly FORM4_COD_CREDMEDIANASEMPRESAS_ARRENFINANC = 'ff4_credmedianasemperesasarrenfinanc';
    public readonly FORM4_COD_CREDMEDIANASEMPRESAS_COMERCIOEXTERIOR = 'ff4_credmedianasemperesascomercioexterior';
    public readonly FORM4_COD_CREDMEDIANASEMPRESAS_OTROS = 'ff4_credmedianasemperesasotros';

    public readonly FORM4_COD_CREDPEQUENIASEMPRESAS_TARJETACREDITO = 'ff4_credpequeniasempresastarjetacredito';
    public readonly FORM4_COD_CREDPEQUENIASEMPRESAS_DESCUENTOS = 'ff4_credpequeniasempresasdescuentos';
    public readonly FORM4_COD_CREDPEQUENIASEMPRESAS_PRESTAMOS = 'ff4_credpequeniasempresasprestamos';
    public readonly FORM4_COD_CREDPEQUENIASEMPRESAS_FACTORING = 'ff4_credpequeniasempresasfactoring';
    public readonly FORM4_COD_CREDPEQUENIASEMPRESAS_ARRENFINANC = 'ff4_credpequeniasempresasarrenfinanc';
    public readonly FORM4_COD_CREDPEQUENIASEMPRESAS_COMERCIOEXTERIOR = 'ff4_credpequeniasempresascomercioexterior';
    public readonly FORM4_COD_CREDPEQUENIASEMPRESAS_OTROS = 'ff4_credpequeniasempresasotros';

    public readonly FORM4_COD_CREDMICROEMPRESAS_TARJETACREDITO = 'ff4_credmicroempresastarjetacredito';
    public readonly FORM4_COD_CREDMICROEMPRESAS_DESCUENTOS = 'ff4_credmicroempresasdescuentos';
    public readonly FORM4_COD_CREDMICROEMPRESAS_PRESTAMOS = 'ff4_credmicroempresasprestamos';
    public readonly FORM4_COD_CREDMICROEMPRESAS_FACTORING = 'ff4_credmicroempresasfactoring';
    public readonly FORM4_COD_CREDMICROEMPRESAS_ARRENFINANC = 'ff4_credmicroempresasarrenfinanc';
    public readonly FORM4_COD_CREDMICROEMPRESAS_COMERCIOEXTERIOR = 'ff4_credmicroempresascomercioexterior';
    public readonly FORM4_COD_CREDMICROEMPRESAS_OTROS = 'ff4_credmicroempresasotros';

    public readonly FORM4_COD_CREDCONSUMO_TARJETACREDITO = 'ff4_credconsumotarjetacredito';
    public readonly FORM4_COD_CREDCONSUMO_PRESTAMOS = 'ff4_credconsumoprestamos';
    public readonly FORM4_COD_CREDCONSUMO_PRESTAMOSREVOLVENTES = 'ff4_credconsumoprestamosrevolventes';
    public readonly FORM4_COD_CREDCONSUMO_PRESTAMOSNOREVOLVENTES = 'ff4_credconsumoprestamosnorevolventes';
    public readonly FORM4_COD_CREDCONSUMO_PRESTAMOSAUTOS = 'ff4_credconsumoprestamosautos';
    public readonly FORM4_COD_CREDCONSUMO_COMERCIOEXTERIOR = 'ff4_credconsumocomercioexterior';
    public readonly FORM4_COD_CREDCONSUMO_OTROS = 'ff4_credconsumootros';

    public readonly FORM4_COD_CREDHIPOVIVIENDA_PRESTAMOS = 'ff4_credhipviviendaprestaprestamos';
    public readonly FORM4_COD_CREDHIPOVIVIENDA_PRESTAMOSMIVIVIENDA = 'ff4_credhipviviendaprestavivienda';
    public readonly FORM4_COD_CREDHIPOVIVIENDA_OTROS = 'ff4_credhipviviendaotros';

    // Formulario 5 - MOROSIDAD SEGÚN TIPO Y MODALIDAD DE CRÉDITO
    // -----------------------------------------------------------------
    public readonly FORM5_COD_TOTAL_CREDCORPORATIVOS = 'ff5_totalcredcorporativos';
    public readonly FORM5_COD_TOTAL_CREDGRANDESEMPRESAS = 'ff5_totalcredgrandesempresas';
    public readonly FORM5_COD_TOTAL_CREDMEDIANASEMPRESAS = 'ff5_totalcredmedianasempresas';
    public readonly FORM5_COD_TOTAL_CREDPEQUENIASEMPRESAS = 'ff5_totalcredpequeniasempresas';
    public readonly FORM5_COD_TOTAL_CREDMICROEMPRESAS = 'ff5_totalcredmicroempresas';
    public readonly FORM5_COD_TOTAL_CREDCONSUMO = 'ff5_totalcredconsumo';
    public readonly FORM5_COD_TOTAL_CREDHIPOVIVIENDA = 'ff5_totalcredhipvivienda';

    public readonly FORM5_COD_CREDCORPORATIVOS_TARJETACREDITO = 'ff5_credcorporativostarjetacredito';
    public readonly FORM5_COD_CREDCORPORATIVOS_DESCUENTOS = 'ff5_credcorporativosdescuentos';
    public readonly FORM5_COD_CREDCORPORATIVOS_PRESTAMOS = 'ff5_credcorporativosprestamos';
    public readonly FORM5_COD_CREDCORPORATIVOS_FACTORING = 'ff5_credcorporativosfactoring';
    public readonly FORM5_COD_CREDCORPORATIVOS_ARRENFINANC = 'ff5_credcorporativosarrenfinanc';
    public readonly FORM5_COD_CREDCORPORATIVOS_COMERCIOEXTERIOR = 'ff5_credcorporativoscomercioexterior';
    public readonly FORM5_COD_CREDCORPORATIVOS_OTROS = 'ff5_credcorporativosotros';

    public readonly FORM5_COD_CREDGRANDESEMPRESAS_TARJETACREDITO = 'ff5_credgrandesempresastarjetacredito';
    public readonly FORM5_COD_CREDGRANDESEMPRESAS_DESCUENTOS = 'ff5_credgrandesempresasdescuentos';
    public readonly FORM5_COD_CREDGRANDESEMPRESAS_PRESTAMOS = 'ff5_credgrandesempresasprestamos';
    public readonly FORM5_COD_CREDGRANDESEMPRESAS_FACTORING = 'ff5_credgrandesempresasfactoring';
    public readonly FORM5_COD_CREDGRANDESEMPRESAS_ARRENFINANC = 'ff5_credgrandesempresasarrenfinanc';
    public readonly FORM5_COD_CREDGRANDESEMPRESAS_COMERCIOEXTERIOR = 'ff5_credgrandesempresascomercioexterior';
    public readonly FORM5_COD_CREDGRANDESEMPRESAS_OTROS = 'ff5_credgrandesempresasotros';

    public readonly FORM5_COD_CREDMEDIANASEMPRESAS_TARJETACREDITO = 'ff5_credmedianasemperesastarjetacredito';
    public readonly FORM5_COD_CREDMEDIANASEMPRESAS_DESCUENTOS = 'ff5_credmedianasemperesasdescuentos';
    public readonly FORM5_COD_CREDMEDIANASEMPRESAS_PRESTAMOS = 'ff5_credmedianasemperesasprestamos';
    public readonly FORM5_COD_CREDMEDIANASEMPRESAS_FACTORING = 'ff5_credmedianasemperesasfactoring';
    public readonly FORM5_COD_CREDMEDIANASEMPRESAS_ARRENFINANC = 'ff5_credmedianasemperesasarrenfinanc';
    public readonly FORM5_COD_CREDMEDIANASEMPRESAS_COMERCIOEXTERIOR = 'ff5_credmedianasemperesascomercioexterior';
    public readonly FORM5_COD_CREDMEDIANASEMPRESAS_OTROS = 'ff5_credmedianasemperesasotros';

    public readonly FORM5_COD_CREDPEQUENIASEMPRESAS_TARJETACREDITO = 'ff5_credpequeniasempresastarjetacredito';
    public readonly FORM5_COD_CREDPEQUENIASEMPRESAS_DESCUENTOS = 'ff5_credpequeniasempresasdescuentos';
    public readonly FORM5_COD_CREDPEQUENIASEMPRESAS_PRESTAMOS = 'ff5_credpequeniasempresasprestamos';
    public readonly FORM5_COD_CREDPEQUENIASEMPRESAS_FACTORING = 'ff5_credpequeniasempresasfactoring';
    public readonly FORM5_COD_CREDPEQUENIASEMPRESAS_ARRENFINANC = 'ff5_credpequeniasempresasarrenfinanc';
    public readonly FORM5_COD_CREDPEQUENIASEMPRESAS_COMERCIOEXTERIOR = 'ff5_credpequeniasempresascomercioexterior';
    public readonly FORM5_COD_CREDPEQUENIASEMPRESAS_OTROS = 'ff5_credpequeniasempresasotros';

    public readonly FORM5_COD_CREDMICROEMPRESAS_TARJETACREDITO = 'ff5_credmicroempresastarjetacredito';
    public readonly FORM5_COD_CREDMICROEMPRESAS_DESCUENTOS = 'ff5_credmicroempresasdescuentos';
    public readonly FORM5_COD_CREDMICROEMPRESAS_PRESTAMOS = 'ff5_credmicroempresasprestamos';
    public readonly FORM5_COD_CREDMICROEMPRESAS_FACTORING = 'ff5_credmicroempresasfactoring';
    public readonly FORM5_COD_CREDMICROEMPRESAS_ARRENFINANC = 'ff5_credmicroempresasarrenfinanc';
    public readonly FORM5_COD_CREDMICROEMPRESAS_COMERCIOEXTERIOR = 'ff5_credmicroempresascomercioexterior';
    public readonly FORM5_COD_CREDMICROEMPRESAS_OTROS = 'ff5_credmicroempresasotros';

    public readonly FORM5_COD_CREDCONSUMO_TARJETACREDITO = 'ff5_credconsumotarjetacredito';
    public readonly FORM5_COD_CREDCONSUMO_PRESTAMOS = 'ff5_credconsumoprestamos';
    public readonly FORM5_COD_CREDCONSUMO_PRESTAMOSREVOLVENTES = 'ff5_credconsumoprestamosrevolventes';
    public readonly FORM5_COD_CREDCONSUMO_PRESTAMOSNOREVOLVENTES = 'ff5_credconsumoprestamosnorevolventes';
    public readonly FORM5_COD_CREDCONSUMO_PRESTAMOSAUTOS = 'ff5_credconsumoprestamosautos';
    public readonly FORM5_COD_CREDCONSUMO_COMERCIOEXTERIOR = 'ff5_credconsumocomercioexterior';
    public readonly FORM5_COD_CREDCONSUMO_OTROS = 'ff5_credconsumootros';

    public readonly FORM5_COD_CREDHIPOVIVIENDA_PRESTAMOS = 'ff5_credhipviviendaprestaprestamos';
    public readonly FORM5_COD_CREDHIPOVIVIENDA_PRESTAMOSMIVIVIENDA = 'ff5_credhipviviendaprestavivienda';
    public readonly FORM5_COD_CREDHIPOVIVIENDA_OTROS = 'ff5_credhipviviendaotros';
    // Formulario 6 - CRÉDITOS DIRECTOS POR TIPO DE CRÉDITO Y SECTOR ECONÓMICO
    // -----------------------------------------------------------------
    // CRÉDITOS CORPORATIVOS, GRANDES, MEDIANAS, PEQUEÑAS Y A MICROEMPRESAS
    public readonly FORM6_COD_DIRECTIPOCREDSECTECO_AGRICULTURA = 'ff6_dirtipcresececoagri';
    public readonly FORM6_COD_DIRECTIPOCREDSECTECO_PESCA = 'ff6_dirtipcresececopesca';
    public readonly FORM6_COD_DIRECTIPOCREDSECTECO_MINERIA = 'ff6_dirtipcresececomineria';
    public readonly FORM6_COD_DIRECTIPOCREDSECTECO_INDMANUFACTURERA = 'ff6_dirtipcresececoindmanuf';
    public readonly FORM6_COD_DIRECTIPOCREDSECTECO_ALIMENTOS = 'ff6_dirtipcresececoalimentos';
    public readonly FORM6_COD_DIRECTIPOCREDSECTECO_TEXTILES = 'ff6_dirtipcresececotext';
    public readonly FORM6_COD_DIRECTIPOCREDSECTECO_MADERA = 'ff6_dirtipcresececomade';
    public readonly FORM6_COD_DIRECTIPOCREDSECTECO_FABSUSTANCIASQUIMICAS = 'ff6_dirtipcresececofabsusqui';
    public readonly FORM6_COD_DIRECTIPOCREDSECTECO_FABPRODUCTOSCAUCHO = 'ff6_dirtipcresececofabcau';
    public readonly FORM6_COD_DIRECTIPOCREDSECTECO_FABPRODUCTOSMINERALES = 'ff6_dirtipcresececofabprodmin';
    public readonly FORM6_COD_DIRECTIPOCREDSECTECO_FABMETALES = 'ff6_dirtipcresececofabmetales';
    public readonly FORM6_COD_DIRECTIPOCREDSECTECO_MAQUINARIA = 'ff6_dirtipcresececomaqui';
    public readonly FORM6_COD_DIRECTIPOCREDSECTECO_FABVEHICULOSTRANSPORTE = 'ff6_dirtipcresececofabvehitrans';
    public readonly FORM6_COD_DIRECTIPOCREDSECTECO_RESTOMANUFACTURA = 'ff6_dirtipcresececoresmanuf';
    public readonly FORM6_COD_DIRECTIPOCREDSECTECO_ELECGASAGUA = 'ff6_dirtipcresececoelecgas';
    public readonly FORM6_COD_DIRECTIPOCREDSECTECO_CONSTRUCCION = 'ff6_dirtipcresececoconstr';
    public readonly FORM6_COD_DIRECTIPOCREDSECTECO_COMERCIO = 'ff6_dirtipcresececocomer';
    public readonly FORM6_COD_DIRECTIPOCREDSECTECO_VENTAREPARACIONVEHICULOS = 'ff6_dirtipcresececovenrepavehi';
    public readonly FORM6_COD_DIRECTIPOCREDSECTECO_COMERCIOMAYOR = 'ff6_dirtipcresececocomermayor';
    public readonly FORM6_COD_DIRECTIPOCREDSECTECO_COMERCIOMENOR = 'ff6_dirtipcresececocomermenor';
    public readonly FORM6_COD_DIRECTIPOCREDSECTECO_HOTELESRESTAURANTES = 'ff6_dirtipcresececohotresta';
    public readonly FORM6_COD_DIRECTIPOCREDSECTECO_TRANSPORTEALMCOMUNI = 'ff6_dirtipcresececotransalmcomu';
    public readonly FORM6_COD_DIRECTIPOCREDSECTECO_INTERFINANCIERA = 'ff6_dirtipcresececointerfinan';
    public readonly FORM6_COD_DIRECTIPOCREDSECTECO_ACTINMOBILIARIASEMPRALQUI = 'ff6_dirtipcresececoactimobempalqu';
    public readonly FORM6_COD_DIRECTIPOCREDSECTECO_ACTINMOBILIARIASALQUI = 'ff6_dirtipcresececoactimobalqu';
    public readonly FORM6_COD_DIRECTIPOCREDSECTECO_ACTEMPRESARIAL = 'ff6_dirtipcresececoacempre';
    public readonly FORM6_COD_DIRECTIPOCREDSECTECO_ADMINISTRACIONPUBLICA = 'ff6_dirtipcresececoadminpublica';
    public readonly FORM6_COD_DIRECTIPOCREDSECTECO_ENSEÑANZA = 'ff6_dirtipcresececoenseñanza';
    public readonly FORM6_COD_DIRECTIPOCREDSECTECO_SERVSOCIALESSALUD = 'ff6_dirtipcresececoservsocessalud';
    public readonly FORM6_COD_DIRECTIPOCREDSECTECO_OTRASACTIVIDADES = 'ff6_dirtipcresececootrasacti';
    public readonly FORM6_COD_DIRECTIPOCREDSECTECO_HOGARESPRIVADOS = 'ff6_dirtipcresececohogarpriva';
    public readonly FORM6_COD_DIRECTIPOCREDSECTECO_TOTAL = 'ff6_dirtipcresececototal';
    // CRÉDITOS HIPOTECARIOS PARA VIVIENDA
    public readonly FORM6_COD_CREDITOSHIPOTECARIOSVIVIENDA = 'ff6_crehipvivienda';
    // CRÉDITOS DE CONSUMO
    public readonly FORM6_COD_CREDITOSCONSUMO = 'ff6_credconsumo';
    // TOTAL CREDITOS
    public readonly FORM6_COD_TOTALCREDITOS = 'ff6_totalcreditos';

}
