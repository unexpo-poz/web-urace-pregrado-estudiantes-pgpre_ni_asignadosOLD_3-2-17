
function vrLCM(){
	 return (document.f_c.sedeActiva.value.indexOf("CCS") >= 0);
}

function vrPOZ(){
	 return (document.f_c.sedeActiva.value.indexOf("POZ") >= 0);
}

function marcarAsignaturas(asignaturas,asigSC) {

    var cod_uc = new Array();
    scod_uc = "";
    asigs = asignaturas.split(" ");
    with (document.pensum) {
        i = 0; 
        j = 0;
        while (j < asignaturas.length){
            i = 0;
            while(i < (CB.length - 1)){
                cod_uc = CB[i].value.split(" ");  
                if ((cod_uc[0] == asigs[j]) && (cod_uc[0] != asigSC )){
                    CB[i].selectedIndex = parseInt(asigs[j+3],10); 
                }
                i++;
            }
            j = j + 4;
        } 
    }
}

function prepdata(fp,fd) {
    
    fd.cedula.value = ced;
    fd.exp_e.value = exp_e;
    fd.contra.value = contra;
    fd.carrera.value = carrera;
    with (fd) {
		//alert(asigSC.value);
        if(asigSC.value != "") {
            marcarAsignaturas(asignaturas.value, asigSC.value);            
            scMsg = "Lo siento, ya no hay cupo en \n";
            scMsg = scMsg + "la secci�n: " + seccSC.value + "\nde la asignatura: " + asigSC.value;
            scMsg = scMsg + "\n Por favor, modifique su selecci�n";
            asigSC.value ="";
            alert(scMsg);
       }
        else asignaturas.value = "";
    }
    
    var cod_uc = new Array();
    scod_uc ="";
	fd.asignaturas.value = "";
    with(fp) {
        i = 0;
        while(i < (CB.length - 1)){
		  cod_uc = CB[i].value.split(" ");
		  if (cod_uc[5] !='0'){
            // $_POST['asignaturas'] lleva : CODIGO1 SECCION1 condREP1 COLOR1 CODIGO2 SECCION2 condREP2 COLOR2...    
            //scod_uc = cod_uc[0] + " " + cod_uc[5] + " " + cod_uc[6] + " " + cod_uc[8] + " " + cod_uc[7];
			//scod_uc = cod_uc[0] + " " + cod_uc[5] + " " + cod_uc[6] + " " + cod_uc[7];
			scod_uc = cod_uc[0] + " " + cod_uc[5];
			
			if ((document.getElementById(cod_uc[0]+'horas_lab').value > 0) || (document.getElementById(cod_uc[0]+'inscrita').value != 1)){
				scod_uc += "-" + document.getElementById('g'+cod_uc[0]).value;
			}

			scod_uc += " " + cod_uc[6] + " " + cod_uc[7];
			//alert(scod_uc);
			fd.asignaturas.value = fd.asignaturas.value + scod_uc  + " "; 
          }
		  cod_uc = cola[i].value.split(" ");
		  if (cod_uc[5] !='0'){
            // $_POST['asignaturas'] lleva : CODIGO1 SECCION1 condREP1 COLOR1 CODIGO2 SECCION2 condREP2 COLOR2...    
            //scod_uc = cod_uc[0] + " " + cod_uc[5] + " " + cod_uc[6] + " " + cod_uc[8] + " " + cod_uc[7];
			scod_uc = cod_uc[0] + " " + cod_uc[5] + " " + cod_uc[6] + " " + cod_uc[7];;
			//alert(scod_uc);
			fd.asignaturas.value = fd.asignaturas.value + scod_uc  + " "; 
          }
          i++;
        }
    }
    //registra sexo y fecha de nac:
	if (fd.c_inicial.value != "0"){
		laFechaS =	1900 + parseInt(document.getElementById('anioN').value,10); 
		laFechaS += '-';
		laFechaS +=	document.getElementById('mesN').selectedIndex + 1;
		laFechaS += '-';
		laFechaS +=	document.getElementById('diaN').selectedIndex + 1; 
		document.f_c.f_nac_e.value = laFechaS;
		elSexo  = parseInt(document.getElementById('sexoN').value,10);
		//aSexo   = Array('1','2','1');
		//alert(elSexo);
		document.f_c.sexo.value = elSexo;
	}
    if(fd.inscribe.value == fd.inscrito.value) {
        fd.submit();
        return true;
    }
    return true;
}

function actualizarTotales(fp,ft,$update) {
      
    ct_mat		= 0;// Total materias
    ct_uc		= 0;// Total uc
	ct_mat1		= 0;// Total materias insc
    ct_uc1		= 0;// Total uc insc
	ct_mat2		= 0;// Total materias cola
    ct_uc2		= 0;// Total uc cola
    k = fp.CB.length - 1;
	i = fp.cola.length - 1; // Modificado para contador de ultima asignatura en cola
	//alert('mat_cola: '+i+' mat_cupo: '+k);
    with(fp) {
       j = 0;
       while(j < k){
		//	alert('j='+j+'{'+CB[j].value+'} indice='+CB[j].selectedIndex);
          if (CB[j].selectedIndex != '0'){ 
              cod_uc = CB[j].value.split(" ");               
              uc   = parseInt(cod_uc[1],10);
              ct_mat++;
              ct_uc+=uc;
			  ct_mat1++;
              ct_uc1+=uc;
          }
          j++;
       }
	   y = 0;
	   while(y < i){
		//	alert('j='+j+'{'+CB[j].value+'} indice='+CB[j].selectedIndex);
          if (cola[y].selectedIndex != '0'){ 
              cod_uc = cola[y].value.split(" ");               
              uc   = parseInt(cod_uc[1],10);
              ct_mat++;
              ct_uc+=uc;
			  ct_mat2++;
              ct_uc2+=uc;
          }
          y++;
       }
    }
    if ($update){
        with(ft){
            t_mat.value=ct_mat;
            t_uc.value=ct_uc;
			t_mat1.value=ct_mat1;
            t_uc1.value =ct_uc1;
			t_mat2.value=ct_mat2;
            t_uc2.value =ct_uc2;
        }
		return true;
    }
    else return ct_uc;
}
   
function correqInscrito(matAinscribir,correq) {
// matAinscribir: cadena con materias que el estudiante ha inscrito o seleccionado
// correq       : cadena con los correquisitos que deben verificarse. 
// La funcion devuelve un arreglo con dos valores: 
// cOK : verdadero si TODOS los correquisitos estan seleccionados o inscritos
// cFaltantes : Una lista separada por espacios de los correquisitos que le faltan por inscribir
	//alert('materia='+m+' indice='+j);
	cOK = true;
	cFaltantes = '';
	if (correq == ""){
		return Array(cOK,cFaltantes);
	}
	cola = correq.lastIndexOf("_");
	if(cola >=0) {
		cq = correq.substring(0,correq.lastIndexOf("_"));
	}
	else {
		cq = correq;
	}
	aCorreq = cq.split("-");
	for (i=0;i < aCorreq.length; i++ ){
		//alert('MI=['+matAinscribir+'] co=['+aCorreq[i]+']');
		if (matAinscribir.indexOf(aCorreq[i]) < 0) { // No esta el correquisito
			cFaltantes = cFaltantes + aCorreq[i] + ", ";
			cOK = false;
		}
	}
	//elimino la ultima coma que se agrega a cfaltantes:
	cFaltantes = cFaltantes.substring(0,cFaltantes.lastIndexOf(","));
	return Array(cOK,cFaltantes);
}

// Determina si las materias seleccionadas estan dentro de N semestres consecutivos.
// Si no lo estan, devuelve "false" y muestra un mensaje de error.

function materiasEnNsemestres(N, fp) {

	var selOK = ! vrPOZ(); //si es otro vicerrectorado, no chequear
	var masBajo = 10000; //ridiculamente grande para inicializarlo correctamente en la primera revision
	var masAlto = 0;
	var temp = 0;
	if (selOK) {
		return(true);
	}
		//alert("vine a chequear")

    with (fp) {
        for(j=0;j < (CB.length - 1); j++){
            if (CB[j].selectedIndex != '0'){
                cod_uc = CB[j].value.split(" ");                    
                temp = parseInt( "0"+cod_uc[9],10);	//el semestre esta en la posicion 9 ( a partir de cero) en el
													//chorizo del valor de la opcion seleccionada (ver planilla_r.php, linea 285) 
				//que hacer en el caso de electivas??? semestre > 10 en Bqto
				if (temp>10) {
					temp = temp - 2; //esto es arbitrario, no se como ajustarlo!!!
				}
				// actualizar los limites
				if (temp > masAlto) {
					masAlto = temp;
				}
				if (temp < masBajo) {
					masBajo = temp;
				}
            }
			if (cola[j].selectedIndex != '0'){
                cod_uc = cola[j].value.split(" ");                    
                temp = parseInt( "0"+cod_uc[9],10);	//el semestre esta en la posicion 9 ( a partir de cero) en el
													//chorizo del valor de la opcion seleccionada (ver planilla_r.php, linea 285) 
				//que hacer en el caso de electivas??? semestre > 10 en Bqto
				if (temp>10) {
					temp = temp - 2; //esto es arbitrario, no se como ajustarlo!!!
				}
				// actualizar los limites
				if (temp > masAlto) {
					masAlto = temp;
				}
				if (temp < masBajo) {
					masBajo = temp;
				}
            }
        }
	}
	//Revisamos como va la seleccion, si esta repartida en mas de N semestres seguidos
	selOK =  (masAlto - masBajo) < N;
	if (selOK) {
		return (true)
	}
	else { // mensaje de error
		mensaje = "       RESTRICCION DE SEMESTRE! \n";
		mensaje = mensaje + " Disculpa, la asignatura seleccionada viola la \n";
		mensaje = mensaje + " norma de que puedes inscribir materias en un \n";
		mensaje = mensaje + " maximo de " + N + " semestres consecutivos.\n " 
		mensaje = mensaje + " Semestre mas alto: " + masAlto + ".\n Semetre mas bajo: " + masBajo + "."; 
		alert(mensaje)
		return(false)
    }
}


function correquisitoOK(fp) {

    var cOK = true;
    var matAInscr = "";
	var correq = "";
	var control = 0;
    with (fp) {
        for(j=0;j < (CB.length - 1); j++){
            if (CB[j].selectedIndex != '0'){
				
                cod_uc = CB[j].value.split(" ");                    
                arrayMat[j] = cod_uc[0]+" ";
            }
            else arrayMat[j] = "";
        }
        matAInscr = arrayMat.join("");
///////////////////////////////////////////////////////////////////		

		materias = matAInscr.split(" "); //
		
		//alert(materias[0]);
		//if (cod_uc[0] == '300677'){
			if ((materias.lastIndexOf("300676") != "-1") && (materias.lastIndexOf("300677") != "-1")){
				error=('ATENCION:\n\nLas asignaturas VENEZUELA EN EL SIGLO XXI y CIUDADAN�A Y PODER\n');
				error+=('no pueden ser seleccionadas al mismo tiempo.');
				control=1;
				cOK = false;
			}
		//}
///////////////////////////////////////////////////////////////////////
		for(j=0;j < (CB.length - 1); j++){
           if (CB[j].selectedIndex != '0'){
			   //alert(CB[j].value);
			   chequeo = correqInscrito(matAInscr,CBC[j].value);
               if (!chequeo[0]) {
                   correq = correq + "Para poder inscribir " + arrayMat[j];
                   correq = correq + " debes inscribir:\n" + chequeo[1] +"\n"; 
                   cOK = false;
				   control=2;
				   break;
               } 
           }

       }
    }
    if (!cOK){
		if (control == 1){
			alert(error);
		}
		if (control == 2){
			alert("Conflicto de correquisito:\n" + correq);
		}        
		return(false);
    }
	else {
		//OJO Deshabilitado para inscripcion Octubre 2011
		//return(materiasEnNsemestres(3, fp)); //chequea para POZ si las materias no estan en mas de 3 semestres consecutivos

		return(true)
	}
}


function actualizarSecciones() {

    with (document.pensum) {
        for(j=0;j < (CB.length - 1); j++){             
            arraySecc[j] = CB[j].selectedIndex;
        }
    }
}

function estadoAnterior(lSeccion){

    with (document.pensum) {
        for(j=0;j < (CB.length - 1); j++){
            cod_ucSel = lSeccion.value.split(" "); 
            cod_uc    = CB[j].value.split(" ");            
            if (cod_ucSel[0] == cod_uc[0]){
                        
                lSeccion.options[arraySecc[j]].selected = true;
            }
        }

    }
}


function calcularMaxCargaCCS() {
    
    iMateria = -1; //indica que ninguna materia genera exceso de creditos
    limite   = 21;
    obligatoria  = 0; //0=no obliga, 1=obliga pero puede ver otras, 2=sola
	seleccionada = 0;
	noHayMarcadas = true;
    with (document.pensum) {
        for(j=0;j < (CB.length - 1); j++){
            vcod_uc  = CB[j].value.split(" ");
            vuc      = parseInt(vcod_uc[1],10);
            vrepite  = parseInt('0'+vcod_uc[2],10);
            vcre_cur = parseInt(vcod_uc[3],10);
            if ((vrepite == 2) && (obligatoria <2)) {
					limite = 9;
                    obligatoria = 1;
                    if(noHayMarcadas) {
						iMateria = j;
					}
					if (CB[j].selectedIndex !='0') {
						seleccionada +=1;
						noHayMarcadas = false;
					}
			}
			else if (vrepite > 2) {
                    limite = vuc;
                    obligatoria = 2;
                    if(noHayMarcadas) {
						iMateria = j;
					}
					if (CB[j].selectedIndex !='0') {
						seleccionada +=1;
						noHayMarcadas = false;
					}
			}
		//alert('['+noHayMarcadas+']['+vcod_uc[0]+']['+iMateria+']['+obligatoria+']['+seleccionada+']');
		}
	}
    return(Array(iMateria,limite,obligatoria, seleccionada));
}


function excesoDeCreditosCCS(lSeccion) {
    
	// lSeccion es un campo que contiene la sgte informacion 
	// separada por espacios: 
	//      [0]              [1]          [2]              [3]                        [4] 
	// codigo_asignatura, creditos, veces_que_repite, cred_curs_ultima_repitencia, tipo_lapso 
    
    exceso  = false;
    ecod_uc  = lSeccion.value.split(" ");               
    ucm     = parseInt(ecod_uc[1],10);
    repite  = parseInt('0'+ ecod_uc[2],10);
    cre_cur = parseInt(ecod_uc[3],10);
    total_uc= parseInt(document.totales.t_uc.value,10);
    total_mat= parseInt(document.totales.t_mat.value,10);
    indice = parseFloat(document.f_c.ind_acad.value);

    maxCarga = new Array(3) //contiene maximo de creditos, condicion que aplica 
                            //y puntero a la materia que limita.
	if (actualizarTotales(document.pensum,document.totales, false) == total_uc) {
        ucm = 0;
    }
    if (lSeccion.selectedIndex == '0') {
        ucm = -ucm;
    }
	if (ucm>0) {
		total_mat +=1;
	}
	maxCarga = calcularMaxCargaCCS(); //Array(Imateria, limite, obligatoria);

    iMateria    = maxCarga[0];
	maxCreditos = maxCarga[1];
    obligatoria = maxCarga[2];
    seleccionada = maxCarga[3];
	crAinsc  = total_uc + ucm;

	noPuedeEliminarla = (ucm < 0) && (repite > 1) && (total_mat > 1) &&(seleccionada == 0);
	
	if (iMateria >= 0) {
        matLim = document.pensum.CB[iMateria].value.split(" ");
        }
    else {
         matLim = "";
    }

	if (noPuedeEliminarla) {
		// alert('no puede eliminarla');
		if (repite == 2) {
			maxCreditos = 9;
		}
		else if (repite > 2) {
			maxCreditos = -ucm;
		}
		matLim[0] = ecod_uc[0];
	}

    if ((crAinsc > maxCreditos) || ((matLim !="") &&  (seleccionada == 0) && (crAinsc > 0)) || noPuedeEliminarla) {
        exceso = true;
        mens1 = "    PROBLEMA DE EXCESO DE CR�DITOS:\nNo puedes ";
        (ucm > 0) ? mAQ = "agregar" : mAQ = "borrar";
        mens1  = mens1 + mAQ + " esta asignatura.\n"
        mcausa = "Tu l�mite es ";
		if (matLim !="") {
			mcausa = "La condici�n de repitencia de la asignatura \n";
            mcausa = mcausa + matLim[0] + " te obliga a cursarla ";
			mensLC = "con un limite de " + maxCreditos + " cr�ditos\n";
			mensCS = "";       
		}
		else {
			mensLC = maxCreditos + " cr�ditos\n";
			mensCS = " y estas intentando inscribir " + crAinsc + " cr�ditos.\n";      
		}
    }

    if (exceso) {
        alert(mens1 + mcausa + mensLC + mensCS);
    }
    return exceso;
}


function calcularMaxCargaBQTO() {
    
    iMateria = -1; //indica que ninguna materia genera exceso de creditos
    limite   = 21;
    veces    = '';
    with (document.pensum) {
        for(j=0;j < (CB.length - 1); j++){
            vcod_uc  = CB[j].value.split(" ");
            vuc      = parseInt(vcod_uc[1],10);
            vrepite  = vcod_uc[2];
            cre_cur = parseInt('0'+vcod_uc[3],10);
            vt_lapso = vcod_uc[4];
            if ((vt_lapso !='I') && (CB[j].selectedIndex !='0')) {
                switch(vrepite) {
                    case '':
                            break;
                    case '0' :
                    case 'R' : //repite por primera vez
                            if (veces == '') {
                                limite = cre_cur;
                                iMateria = j;
                            }
                            else if((veces == '0')||(veces == 'R')){
                                if (limite < cre_cur) {
                                    limite = cre_cur;
                                    iMateria = j;
                                }
                            }
                            veces = vrepite;
                            break;
                    case '1' : //repite por 2da vez
                            if ((veces =='') || (veces =='0')) {
                                (cre_cur > 10) ? limite = 10 : limite = cre_cur;
                                iMateria = j;
                                veces = '1';
                            }
                            else if (veces == '1') {
                                if (limite < cre_cur ) {
                                    limite = cre_cur;
                                    iMateria = j;
                                }
                                if (limite > 10) {
                                    limite = 10;
                                }  

                            }
                            break;
                    case '2' : //repite por tercera vez : debe verla solita
                            if (veces != '2') {
                                limite = vuc;
                                veces = '2';
                                iMateria = j
                            }
                } //switch (repite)
            }
        }
    }
    return(Array(iMateria,limite,veces));
}

function excesoDeCreditosBQTO(lSeccion) {
    
	// lSeccion es un campo que contiene la sgte informacion 
	// separada por espacios: 
	//      [0]              [1]          [2]              [3]                        [4] 
	// codigo_asignatura, creditos, veces_que_repite, cred_curs_ultima_repitencia, tipo_lapso 
    
    exceso  = false;
    ecod_uc  = lSeccion.value.split(" ");               
    ucm     = parseInt(ecod_uc[1],10);
    repite  = ecod_uc[2];
    cre_cur = parseInt(ecod_uc[3],10);
    t_lapso = ecod_uc[4];
    total_uc= parseInt(document.totales.t_uc.value);
    total_mat= parseInt(document.totales.t_mat.value,10);
    indice = parseFloat(document.f_c.ind_acad.value);
    maxCarga = new Array(3) //contiene maximo de creditos, condicion que aplica 
                            //y puntero a la materia que limita.
    if(indice >= 6.0) {
        CreditosAdic = 2;
    }
    else {
        CreditosAdic = 0;
    }
    //alert("seccion=" + lSeccion.selectedIndex );
    if (actualizarTotales(document.pensum,document.totales, false) == total_uc) {
        ucm = 0
    }
    if (lSeccion.selectedIndex == '0') {
        ucm = -ucm;
    }
	if (ucm>0) {
		total_mat +=1;
	}

	maxCarga = calcularMaxCargaBQTO(); //Array(Imateria, limite, veces);

    iMateria = maxCarga[0];
    limite   = maxCarga[1];
    veces    = maxCarga[2];
    crAinsc  = total_uc + ucm;

    (veces =='2') ? maxCreditos = limite : maxCreditos = limite + CreditosAdic;
    
	if (iMateria >= 0) {
        matLim = document.pensum.CB[iMateria].value.split(" ");
        }
    else {
         matLim = "";
    }
    if (crAinsc > maxCreditos){
        exceso = true;
        mens1 = "    PROBLEMA DE EXCESO DE CR�DITOS:\nNo puedes ";
        (ucm > 0) ? mAQ = "agregar" : mAQ = "borrar";
        mens1  = mens1 + mAQ + " esta asignatura.\n"
        mensLC = maxCreditos + " cr�ditos\n";
        mensCS = " y estas intentando inscribir " + crAinsc + " cr�ditos.\n";       
        mcausa = "Tu l�mite es ";
        if (veces != '') {
            mcausa = "La condici�n de repitencia de la asignatura \n";
            mcausa = mcausa + matLim[0] + " te limita a ";
        }
    }
    if (exceso) {
        alert(mens1 + mcausa + mensLC + mensCS);
    }
    return exceso;
}


//Desde aqui modificacion realizada en POZ el 23/02/2007

/*function calcularMaxCargaPOZ() {
    
    iMateria = -1; //indica que ninguna materia genera exceso de creditos
    limite   = 22;
    veces    = '';
	matAinsc= 0;
    with (document.pensum) {
        for(j=0;j < (CB.length - 1); j++){
			//alert(CB[j].value);
			//alert(cola[j].value);
			vcod_uc  = CB[j].value.split(" ");
			vuc      = parseInt(vcod_uc[1],10);
            vrepite  = vcod_uc[2];
            cre_cur  = parseInt('0'+vcod_uc[3],10);
            vt_lapso = vcod_uc[4];
			// Repite la primera vez (18 uc si inscribe la materia)
			if ((vt_lapso !='I') && (CB[j].selectedIndex !='0')) {
			
			if ((vrepite =='1') && ((veces =='') || (veces =='1'))) {
								limite = 18 ;
								//alert (vrepite);
								//alert (limite);
                                iMateria = j;
                                veces = '1';
                            }
                   
			// Para la segunda vez en adelante
              if ((vrepite >'1') && ((veces =='') || (veces =='1'))) {
								//alert (vrepite);
                                matAinsc = 2;
								//alert (limite);
                                iMateria = j;
                                veces = vrepite;
                            }             
         
                            
            }
        }
		for(j=0;j < (cola.length - 1); j++){
			//alert(CB[j].value);
			//alert(cola[j].value);
			vcod_uc  = cola[j].value.split(" ");
			vuc      = parseInt(vcod_uc[1],10);
            vrepite  = vcod_uc[2];
            cre_cur  = parseInt('0'+vcod_uc[3],10);
            vt_lapso = vcod_uc[4];
			// Repite la primera vez (18 uc si inscribe la materia)
			if ((vt_lapso !='I') && (cola[j].selectedIndex !='0')) {
			
			if ((vrepite =='1') && ((veces =='') || (veces =='1'))) {
								limite = 18 ;
								//alert (vrepite);
								//alert (limite);
                                iMateria = j;
                                veces = '1';
                            }
                   
			// Para la segunda vez en adelante
              if ((vrepite >'1') && ((veces =='') || (veces =='1'))) {
								//alert (vrepite);
                                matAinsc = 2;
								//alert (limite);
                                iMateria = j;
                                veces = vrepite;
                            }             
         
                            
            }
        }
    }
    return(Array(iMateria,limite,veces,matAinsc));
}*/

function calcularMaxCargaPOZ() {
    
    iMateria = -1; //indica que ninguna materia genera exceso de creditos
    limite   = 22;
    veces    = '';
	matAinsc= 0;
    with (document.pensum) {
        for(j=0;j < (CB.length - 1); j++){
			//alert(CB[j].value);
			//alert(cola[j].value);
			vcod_uc  = CB[j].value.split(" ");
			vuc      = parseInt(vcod_uc[1],10);
            vrepite  = vcod_uc[2];
            cre_cur  = parseInt('0'+vcod_uc[3],10);
            vt_lapso = vcod_uc[4];
			// Repite la primera vez (18 uc si inscribe la materia)
			if ((vt_lapso !='I') && (CB[j].selectedIndex !='0')) {

				/*if ((vrepite =='1') && ((veces =='') || (veces =='1'))) {
					limite = 18 ;
					iMateria = j;
					veces = '1';
				}
                   
				// Para la segunda vez en adelante
				if ((vrepite >'1') && ((veces =='') || (veces =='1'))) {
					matAinsc = 2;
					iMateria = j;
					veces = vrepite;
				} */
				if ( ( (vrepite == '1') || (vrepite == '4') ) && ((veces =='') || (veces =='1'))) {
					limite = 18 ;
					iMateria = j;
					veces = '1';
				}
                   
				// Para la segunda vez en adelante
				if ( ( (vrepite > '1') && (vrepite != '4') ) && ((veces =='') || (veces =='1'))) {
					matAinsc = 2;
					iMateria = j;
					veces = vrepite;
				}
            }
        }
		for(j=0;j < (cola.length - 1); j++){
			//alert(CB[j].value);
			//alert(cola[j].value);
			vcod_uc  = cola[j].value.split(" ");
			vuc      = parseInt(vcod_uc[1],10);
            vrepite  = vcod_uc[2];
            cre_cur  = parseInt('0'+vcod_uc[3],10);
            vt_lapso = vcod_uc[4];
			// Repite la primera vez (18 uc si inscribe la materia)
			if ((vt_lapso !='I') && (cola[j].selectedIndex !='0')) {

				if ( ( (vrepite == '1') || (vrepite == '4') ) && ((veces =='') || (veces =='1'))) {
					limite = 18 ;
					iMateria = j;
					veces = '1';
				}
                   
				// Para la segunda vez en adelante
				if ( ( (vrepite > '1') && (vrepite != '4') ) && ((veces =='') || (veces =='1'))) {
					matAinsc = 2;
					iMateria = j;
					veces = vrepite;
				}
			
			/*if ((vrepite =='1') && ((veces =='') || (veces =='1'))) {
								limite = 18 ;
								//alert (vrepite);
								//alert (limite);
                                iMateria = j;
                                veces = '1';
                            }
                   
			// Para la segunda vez en adelante
              if ((vrepite >'1') && ((veces =='') || (veces =='1'))) {
								//alert (vrepite);
                                matAinsc = 2;
								//alert (limite);
                                iMateria = j;
                                veces = vrepite;
                            }    */         
         
                            
            }
        }
    }
    return(Array(iMateria,limite,veces,matAinsc));
}

function excesoDeCreditosPOZ(lSeccion) {
    
	// lSeccion es un campo que contiene la sgte informacion 
	// separada por espacios: 
	//      [0]              [1]          [2]              [3]                        [4] 
	// codigo_asignatura, creditos, veces_que_repite, cred_curs_ultima_repitencia, tipo_lapso 
    
    exceso  = false;
    ecod_uc = lSeccion.value.split(" ");               
    ucm     = parseInt(ecod_uc[1],10);
    repite  = ecod_uc[2];
    cre_cur = parseInt(ecod_uc[3],10);
    t_lapso = ecod_uc[4];
    total_uc= parseInt(document.totales.t_uc.value);
    total_mat= parseInt(document.totales.t_mat.value,10);
    indice = parseFloat(document.f_c.ind_acad.value);
    maxCarga = new Array(4) //contiene maximo de creditos, condicion que aplica 
                            //y puntero a la materia que limita.
    
    //alert("seccion=" + lSeccion.selectedIndex );
    if (actualizarTotales(document.pensum,document.totales, true) == total_uc) {
        ucm = 0
    }
    if (lSeccion.selectedIndex == '0') {
        ucm = -ucm;
    }
	if (ucm>0) {
		total_mat +=1;
	}

	maxCarga = calcularMaxCargaPOZ(); //Array(Imateria, limite, veces);

    iMateria = maxCarga[0];
    limite   = maxCarga[1];
    veces    = maxCarga[2];
	matAinsc = maxCarga[3];
    crAinsc  = total_uc + ucm;
	//alert(matAinsc);
    (veces =='1') ? maxCreditos = limite : maxCreditos = limite ;
	
    
	if (iMateria >= 0) {
		matLim = document.pensum.CB[iMateria].value.split(" ");
        }
    else {
         matLim = "";
		 
    }
    if (matAinsc!=0 ){
    
		if ( total_mat > matAinsc){
        exceso = true;
        mens1 = "    PROBLEMA DE EXCESO DE CR�DITOS:\nNo puedes ";
        (ucm > 0) ? mAQ = "agregar" : mAQ = "borrar";
        mens1  = mens1 + mAQ + " esta asignatura.\n"
        mensLC = matAinsc + " materias.\n";
        mensCS = " y estas intentando inscribir " + total_mat + " materias.\n";       
        mcausa = "Tu l�mite es ";
        if (veces != '') {
            mcausa = "La condici�n de repitencia de la asignatura \n";
            mcausa = mcausa + matLim[0] + " te limita a ";
        }
    }
	}
    else if (crAinsc > maxCreditos){
			exceso = true;
			mens1 = "    PROBLEMA DE EXCESO DE CR�DITOS:\nNo puedes ";
			(ucm > 0) ? mAQ = "agregar" : mAQ = "borrar";
			mens1  = mens1 + mAQ + " esta asignatura.\n"
			mensLC = maxCreditos + " cr�ditos\n";
			mensCS = " y estas intentando inscribir " + crAinsc + " cr�ditos.\n";       
			mcausa = "Tu l�mite es ";
			if (veces != '') {
				mcausa = "La condici�n de repitencia de la asignatura \n";
				mcausa = mcausa + matLim[0] + " te limita a ";
				}
			 }
		
	if (exceso) {
        alert(mens1 + mcausa + mensLC + mensCS);
    }
    return exceso;
	}
 
	
// Fin de la Modificacion

function cambiarColor(lSeccion) {
    cod_uc = lSeccion.value.split(" ");
    for(i=0;i<7;i++){
        identCol = cod_uc[0]+i; //identificador de division
		text_color = '#000000';
        switch (cod_uc[7]) { // de acuerdo a la seleccion y estatus, se establece el color:
            case 'G' :  lcolor='#F0F0F0'; //gris : NO SELECCIONADO
						
						// rutina para deshabilitar grupos
						codigo = lSeccion.value.split(" ");
						c_asigna = codigo[0];
						if (document.getElementById(c_asigna+'horas_lab').value > 0){
							document.getElementById('g'+c_asigna).selectedIndex = 0;
							document.getElementById('g'+c_asigna).disabled = true;
						}
                        
						break;
            case 'B' :  lcolor='#99CCFF'; //azul : INSCRITO
						
						// rutina para habilitar grupos
						codigo = lSeccion.value.split(" ");
						c_asigna = codigo[0];
						seccion = codigo[5];
						if ((document.getElementById(c_asigna+'horas_lab').value > 0) && (document.getElementById(c_asigna+'horas_teo').value > 0) && (document.getElementById(c_asigna+'inscrita').value != 1)){
							busca_grupo(c_asigna,seccion);
							//document.getElementById('g'+c_asigna).disabled = false;
							
						}

                        break;
            case 'X' :  lcolor='#FF6666'; //rojo : RETIRO
						text_color ='#FFFFFF';
                        break;
			case 'Y' :  lcolor='#FFFF66'; //amarillo : EN COLA
						text_color ='#000000';
						
						// rutina para habilitar grupos
						/*codigo = lSeccion.value.split(" ");
						c_asigna = codigo[0];
						seccion = codigo[5];
						if ((document.getElementById(c_asigna+'horas_lab').value > 0) && (document.getElementById(c_asigna+'horas_teo').value > 0) && (document.getElementById(c_asigna+'inscrita').value != 1)){
							busca_grupo(c_asigna,seccion);
							//document.getElementById('g'+c_asigna).disabled = false;
							
						}*/

                        break;
        }
        document.getElementById(identCol).style.background = lcolor;
        document.getElementById(identCol).style.color = text_color;
    }

}

function AJAXCrearObjeto(){ 
 var obj; 
 
 if(window.XMLHttpRequest) 
 	{ // no es IE 
 	obj = new XMLHttpRequest(); 
 	} 
	else 
	{ // Es IE o no tiene el objeto 
 		try { 
			 obj = new ActiveXObject("Microsoft.XMLHTTP"); 
		    } 
 		catch (e) { 
 					alert('El navegador utilizado no est� soportado'); 
 				  } 
 	} 
 //alert ("objeto creado");
 return obj; 
} 

function fajax(url,capa,valores,metodo,xml) //xml=1 (SI) xml=0 (NO)
{
	//alert('capa: '+capa);
	
	var ajax=AJAXCrearObjeto();
	var capaContenedora = document.getElementById(capa);
	
	//alert('capa contenedora: '+capaContenedora);
	
	if (capaContenedora.type == "text"){
		texto = true;
	}else{
		texto = false;
	}
	//texto = true;
	var contXML;
	/* Creamos y ejecutamos la instancia si el metodo elegido es POST */
	if (metodo.toUpperCase()=='POST')
	{

		ajax.open ('POST', url, true);
		ajax.onreadystatechange = function() 
		{
			if (ajax.readyState==1) 
			{
				capaContenedora.innerHTML="cargando <img src='loader.gif'>";
			}
			else if (ajax.readyState==4)
			{
				if (ajax.status==200)
				{
					if (xml==0)
					{	
						if (texto){
							document.getElementById(capa).value=ajax.responseText;
						}
						document.getElementById(capa).innerHTML=ajax.responseText;
					}
					if (xml==1)
					{

     					var Contxml  = ajax.responseXML.documentElement;
	   					var items = Contxml.getElementsByTagName('nota')[0];
       					var txt = items.getElementsByTagName('destinatario')[0].firstChild.data; 
						document.getElementById(capa).innerHTML=txt;
						
						
					}
				}
				else if (ajax.readyState=404)
				{
					capaContenedora.innerHTML = "cargando... <img src='loader.gif'>";
				}
				else
				{
					capaContenedora.innerHTML="Error: "+ajax.status;
				}
			}
		}
	
		ajax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		ajax.send(valores);
		return;
	}
	/* Creamos y ejecutamos la instancia si el metodo elegido es GET */
	if (metodo.toUpperCase()=='GET')
	{
		ajax.open ('GET', url, true);
		ajax.onreadystatechange = function() 
		{
			if (ajax.readyState==1) 
			{
				capaContenedora.innerHTML="<img src='loader.gif'>";
			}
			else if (ajax.readyState==4)
			{
				if (ajax.status==200)
				{
					if (xml==0)
					{
						document.getElementById(capa).innerHTML=ajax.responseText;
					}
					if (xml==1)
					{
						alert(ajax.responseXML.getElementsByTagName("nota")[0].childNodes[1].nodeValue); 
					}
				}
				else if (ajax.readyState=404)
				{
					capaContenedora.innerHTML = "La direccion no existe";
				}
				else
				{
					capaContenedora.innerHTML="Error: "+ajax.status;
				}
			}
		}
	
		ajax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		ajax.send(null);
		return;
	}
}

function busca_grupo(c_asigna,seccion) {
	fajax('busca_grupo.php','capa'+c_asigna,'c_asigna='+c_asigna+'&seccion='+seccion,'post','0');
}

//
// Esta es la funcion que se llama cada vez que se selecciona o deselecciona una materia
//
function resaltar(lSeccion) {
	
	// Nota: dentro de correquisitoOK se revisa la restriccion de semestre para POZ
	if (correquisitoOK(document.pensum)) {
		if (vrPOZ()) {
			excesoC = excesoDeCreditosPOZ(lSeccion);
		} else {
			excesoC = excesoDeCreditosBQTO(lSeccion);
		}

		if (!excesoC && inscribeMasBajo(lSeccion)/*true*/){
             cambiarColor(lSeccion);
		} else {
			estadoAnterior(lSeccion);
		}
	} else {
		estadoAnterior(lSeccion);
	}
    actualizarSecciones();
    actualizarTotales(document.pensum,document.totales, true);
}


function reiniciarTodo() {
    //return true;
    with (document) {
        ind_acad = f_c.ind_acad.value;
        pensum.reset();
        totales.reset();
        actualizarTotales(pensum,totales, true); 
        actualizarSecciones(); 
        prepdata(pensum,f_c);
        for(j=0;j < (pensum.CB.length - 1); j++) {
            cambiarColor(pensum.CB[j]);
        }
		for(j=0;j < (pensum.CB.length - 1); j++) {
            cambiarColor(pensum.cola[j]);
        }
    }
	//Actualizamos sexo y fecha de nacimiento:
	//por cortesia, femenino primero (cambiamos M=2, F=1
	//aunque en la base de datos es al reves OJO!
	laFechaS = document.f_c.f_nac_e.value+"---"; //por si la fecha esta en blanco
	laFecha  = new Array();
	laFecha = laFechaS.split('-'); //anio,mes,dia
	//	alert('['+laFecha+']'+laFecha[2]+laFecha[1]+laFecha[0]);
	if (laFechaS != ""){
		document.getElementById('diaN').selectedIndex = laFecha[2] - 1; 
		document.getElementById('mesN').selectedIndex = laFecha[1] - 1;
		document.getElementById('anioN').value = laFecha[0].substr(2,4); 
	}
	elSexo  = parseInt(document.getElementById('sexoN').value,10);
		//aSexo   = Array('1','2','1');
		//alert(elSexo);
		document.f_c.sexo.value = elSexo;
	document.f_c.c_inicial.value = "1"; //marcamos como validada la fecha
}

function fadePopIE(speed){
	//alert(miTiempo);
	if ((miTiempo > 0) && (miTiempo <= 101)) {
		document.getElementById('floatlayer').style.filter="alpha(opacity="+miTiempo+")";
		miTiempo=miTiempo-speed;
		miTimer = setTimeout("fadePopIE("+speed+")","20");
	}
	else if (miTiempo<=0){
		document.getElementById('floatlayer').style.visibility="hidden";
		clearTimeout(miTimer);
	}
	else clearTimeout(miTimer);
}

function fadePopMOZ(speed){
	//alert(miTiempo);
	if ((miTiempo > 0) && (miTiempo <= 101)) {
		document.getElementById('floatlayer').style.opacity=miTiempo/100;
		miTiempo=miTiempo-speed;
		miTimer = setTimeout("fadePopMOZ("+speed+")","20");
	}
	else if (miTiempo<=0){
		document.getElementById('floatlayer').style.visibility="hidden";
		clearTimeout(miTimer);
	}
	else clearTimeout(miTimer);
}

function desvanecer(speed) {
	miTiempo = 100;
	if (speed < 0) {
		miTiempo = 1;
	}
	//alert(miTiempo);
	if (IE4){
		miTimer = setTimeout("fadePopIE("+speed+")","20");
	}
	else if (NS6){
		miTimer = setTimeout("fadePopMOZ("+speed+")","20");
	}
}

function tieneRetiradas() {
	i = 0;
	tiene = false;
	with (document.pensum) {
		while(i < (CB.length - 1) && !tiene){
			tiene = (CB[i].value.indexOf(" X ") >= 0);
			i++;
		}
	}
	return tiene;
}

function verificar(){
    var dia = parseInt (document.getElementById('diaN').selectedIndex) + 1;
    var mes = parseInt (document.getElementById('mesN').selectedIndex) + 1;
    var anyo = parseInt ('0'+document.getElementById('anioN').value,10) + 1900;
	clearTimeout(miTiempo);
    if (CancelPulsado){
        return false;
    }
	if (FechaValida(dia,mes,anyo)){
		vcontra = hex_md5(document.getElementById('pV').value);
		if(vcontra == contra){
			prepdata(document.pensum,document.f_c);
			if ((document.totales.t_mat.value != "0")|| tieneRetiradas()) {
				document.getElementById('pV').value="";
				desvanecer(20);
				document.f_c.submit();
				return true;
			}
			else {
				alert('Debes seleccionar al menos una materia');
				return false;
			}
		}
		else {
			alert('Clave incorrecta.\n Por favor intente de nuevo');
			document.getElementById('pV').value="";
			document.getElementById('pV').focus();
			return false;
		}
	}
}
 

function cancelar() {
    CancelPulsado = true;
    document.getElementById('pV').value="";
    //hideMe();
	desvanecer(10);
}
function Inscribirme() {
	   
    prepdata(document.pensum,document.f_c)
    if ((document.totales.t_mat.value != "0" || tieneRetiradas())) {
		
		//alert(document.f_c.asignaturas.value);

		//		Validacion para seleccionar grupo
		c_asigna = document.f_c.asignaturas.value.split(" ");
		
		error = 0;
		materias = "";

		for (i=0;i < c_asigna.length-1; i=i+4){
			color = c_asigna[i+3];
			if ((document.getElementById(c_asigna[i]+'horas_lab').value > 0) && (document.getElementById(c_asigna[i]+'horas_teo').value > 0) && (document.getElementById('g'+c_asigna[i]).selectedIndex == 0) && (document.getElementById(c_asigna[i]+'inscrita').value != 1) && (color == 'B')){
				materias+= c_asigna[i]+", ";
				error++;
			}
		}

		// OJO Validar no seleccinar grupo si es en cola

/*		for (i=3;i < c_asigna.length-1; i=i+4){
			if ((document.getElementById(c_asigna[i]+'horas_lab').value > 0) && (document.getElementById(c_asigna[i]+'horas_teo').value > 0) && (document.getElementById('g'+c_asigna[i]).selectedIndex == 0) && (document.getElementById(c_asigna[i]+'inscrita').value != 1)){
				materias+= c_asigna[i]+", ";
				error++;
			}
		}
*/
		/*cadena = document.f_c.asignaturas.value.split(" ");
		color = cadena[3];*/

		if (error > 0) {
			
			//alert(color);

			switch (error){
				case 1:
					alert('Debe seleccionar un grupo de laboratorio para la asignatura: '+materias.substring(0,materias.length-2));
					break;
				default:
					alert('Debe seleccionar un grupo de laboratorio para las asignaturas: '+materias.substring(0,materias.length-2));
			}

			
		}else{
			alert('Verifique el estatus de cada asignatura,\nque aparecer� en su planilla de inscripci�n.');
			CancelPulsado = false;        
			showMe();
		}
    }
	else {
        alert('Debes seleccionar al menos una materia');
    }
}

function anyoBisiesto(anyo)
 {
  var fin = anyo;
  if (fin % 4 != 0)
    return false;
    else
     {
      if (fin % 100 == 0)
       {
        if (fin % 400 == 0)
         {
          return true;
         }
          else
           {
            return false;
           }
       }
        else
         {
          return true;
         }
     }
 }

function FechaValida(dia,mes,anyo)
 {
  var anyohoy = new Date();
  var Mensaje = "";
  var yearhoy = anyohoy.getYear();
  if (yearhoy < 1999)
    yearhoy = yearhoy + 1900;
  if(anyoBisiesto(anyo))
    febrero = 29;
    else
      febrero = 28;
   if ((mes == 2) && (dia > febrero))
    {
     Mensaje += "- D�a de nacimiento inv�lido\r\n";
    }
   if (((mes == 4) || (mes == 6) || (mes == 9) || (mes == 11)) && (dia > 30))
    {
     Mensaje += "- D�a de nacimiento inv�lido\r\n";
    }
   if ((anyo<1935) || (yearhoy - anyo < 15))
    {
     Mensaje += "- A�o de nacimiento___ inv�lido\r\n" + anyo;
    }
   if (Mensaje != "")
   {
	   alert(Mensaje);
	   return false;
   }
   else {
	   return true;
   }
 }
 function mostrar_ayuda(ayudaURL) {
		window.open(ayudaURL,"instruciones","left=0,top=0,width=700,height=250,scrollbars=0,resizable=0,status=0");
 }

 /*function SeleccionValida(lSeccion) {
		
 }*/

// Determina si las materias seleccionadas estan dentro de N semestres consecutivos.
// Si no lo estan, devuelve "false" y muestra un mensaje de error.

function inscribeMasBajo(lseccion) {

	semAlto = 0;
	semBajo = 1000;

	with (document.pensum) {
		for(j=0;j < (CB.length - 1); j++){
			if (CB[j].selectedIndex != '0') {
				cod_uc = CB[j].value.split(" "); 
				
				temp = parseInt( "0"+cod_uc[9],10);	

				if (temp>10) {
					temp = temp - 3; 
				}

				// actualizar los limites
				if ((temp > semAlto)) {
					semAlto = temp;
				}
				
				//alert(temp);

				if (temp < semBajo) {
					for(j=0;j < (CB.length - 1); j++){
						if (CB[j].selectedIndex == '0') {
							cod_uc = CB[j].value.split(" ");                    
							temp = parseInt( "0"+cod_uc[9],10);
							if (temp < semBajo) {semBajo = temp;}
						}
					}
				}
			}
		}
	}
	//var masBajo = parseInt(document.getElementById('masBajo').value);

	var masBajo = semBajo;// Semestre mas bajo sin seleccionar

	var temp = 0;

	cambia = false;

if (parseInt(masBajo) < 6) {
	with (document.pensum) {
		seccion = lseccion.value.split(" ");
		temp = parseInt(seccion[9],10);
		
		if (temp>10) {
			temp = temp - 3; 
		}
		
		//if (parseInt(temp) > parseInt(masBajo)) {//Revisar que el semestre mas bajo este inscrito
		if ((parseInt(temp) > 5) && (parseInt(temp) > parseInt(masBajo))) {
			 for(j=0;j < (CB.length -1); j++){

				cod_uc = CB[j].value.split(" ");
							
				sem = parseInt( "0"+cod_uc[9],10);// capturo el semestre de cada materia
				asig = cod_uc[0];
				
				if (sem > 10) {
					sem = sem - 3;
				}

				if (parseInt(sem) == parseInt(masBajo)) {// Si la materia es del semestre mas bajo veo que este inscrita
					if (CB[j].selectedIndex == '0') {
						if ((asig == '300676') || (asig == '300677')) {
							cambia = true;
						}else{
							//cambia = true;
							
//							alert();
							if (cola[j].selectedIndex > 0) {
								cambia = true;
							}else{
								alert ('Debe inscribir la asignatura del semestre mas bajo..');
								cambia = false;
							}
							break;
						}
					}else{
						cambia = true;
					}
				}else{
					cambia = true;
				}
			}			
		}else{
			if (parseInt(temp) == parseInt(masBajo)) {
				for(j=0;j < (CB.length - 1); j++){

					cod_uc = CB[j].value.split(" ");
					
					sem = parseInt( "0"+cod_uc[9],10);// capturo el semestre de cada materia
					asig = cod_uc[0];

					if (sem>10) {
						sem = sem - 3; 
					}
					
					//if (parseInt(sem) > parseInt(masBajo)) {// Si la materia es del semestre mas bajo veo que este inscrita
					if ((parseInt(temp) > 5) && (parseInt(temp) > parseInt(masBajo))) {
						if (CB[j].selectedIndex != '0') {
							if ((asig == '300676') || (asig == '300677')) {
								cambia = true;
							}else{
								alert('Debe inscribir la asignatura del semestre mas bajo.');
								cambia = false;
								break;
							}
						}else{
							cambia = true;
						}
					}else{
						cambia = true;
					}
				}
				
			}else{
				cambia = true;
			}
		}
	}
}else{
	cambia = true;
}// Fin menor a 6

	//cambia = true;

	return cambia;

	/*alert(masBajo);

	with (fp) {
		for(j=0;j < (CB.length - 1); j++){
			cod_uc = CB[j].value.split(" ");                    
			temp = parseInt( "0"+cod_uc[9],10); // Capturo el semestre de la materia
			
			alert(parseInt(masBajo.value));
			
			if ((CB[j].selectedIndex != '0') && (temp > parseInt(masBajo.value))) {// Si esta seleccionanda
				if (temp > masBajo) {
					mensaje = "       ATENCION! \n";
					mensaje = mensaje + " Debe inscribir la asignatura del semestre \n";
					mensaje = mensaje + " mas bajo \n";
					alert(mensaje);
					return(false);
					//break;
				}else{
					return (true)
				}
			}
		}
	}*/
	
    /*with (fp) {
        for(j=0;j < (CB.length - 1); j++){
            if (CB[j].selectedIndex != '0'){
                cod_uc = CB[j].value.split(" ");                    
                temp = parseInt( "0"+cod_uc[9],10);	//el semestre esta en la posicion 9 ( a partir de cero) en el
													//chorizo del valor de la opcion seleccionada (ver planilla_r.php, linea 285) 
				//que hacer en el caso de electivas??? semestre > 10 en Bqto
				if (temp>10) {
					temp = temp - 2; //esto es arbitrario, no se como ajustarlo!!!
				}
				// actualizar los limites
				if (temp > masAlto) {
					masAlto = temp;
				}
				if (temp < masBajo) {
					masBajo = temp;
				}
            }
        }
	}*/
	//Revisamos como va la seleccion, si esta repartida en mas de N semestres seguidos
	/*selOK =  (masAlto - masBajo) < N;
	if (selOK) {
		return (true)
	}
	else { // mensaje de error
		mensaje = "       RESTRICCION DE SEMESTRE! \n";
		mensaje = mensaje + " Disculpa, la asignatura seleccionada viola la \n";
		mensaje = mensaje + " norma de que puedes inscribir materias en un \n";
		mensaje = mensaje + " maximo de " + N + " semestres consecutivos.\n " 
		mensaje = mensaje + " Semestre mas alto: " + masAlto + ".\n Semetre mas bajo: " + masBajo + "."; 
		alert(mensaje)
		return(false)
    }*/
}

