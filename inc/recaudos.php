<?php
	include_once('inc/config.php');
	global $rangoInsc,$horaInsc, $fechaInsc, $num_ins;
	

	print <<<R001
	<table id="recaudos" align="center" border="0" cellpadding="1" 
		cellspacing="2"	 width="740" 
		style="border-collapse:collapse;border-color:white; border-style:solid; background:white;">
		<tr class="instruc">
			<td>Estimado Bachiller:<br></td>
		</tr>
		<tr>
			<td class="instruc">PARA FORMALIZAR TU INSCRIPCI&Oacute;N debes acudir a la sede de la UNEXPO:&nbsp;<b>Los d&iacute;as 15 y 16 de noviembre</b>&nbsp; y traer los siguientes recaudos COMPLETOS:
				<ul style="list-style:circle; background:white;">
					<li> T&iacute;tulo de Bachiller en Ciencias, Industrial o T&eacute;cnico Medio Industrial (original y fondo negro n&iacute;tido).</li>					
					<li>Partida de Nacimiento (original y fotocopia n&iacute;tida).</li>
					<li>Constancia Certificada de Calificaciones de Educaci&oacute;n Media (original y fotocopia n&iacute;tida).</li>
					<li>Original y Fotocopia n&iacute;tida de la C&eacute;dula de Identidad VIGENTE. </li>
					<li>Una (1) fotograf&iacute;a de frente, tama&ntilde;o carnet (NO instant&aacute;neas, sin perforaciones, recientes e iguales).</li>
					<li>Constancia Original de participaci&oacute;n en el proceso de seleccion del C.N.U.</li>
					<li>Una (1) Carpeta marr&oacute;n tama&ntilde;o Oficio nueva y con gancho.</li>
					<li>Copia del dep&oacute;sito efectuado en Banco Caron&iacute;, Cuenta Corriente Nro 0128-003-800-3821542101, a nombre de Ingresos Propios, por un monto de 1.239,00 equivalente a 7 U.T (1 U.T=177 Bs) Validado por Caja.</li>
				</ul>
			</td>
		</tr>
	</table>
R001
;
?>