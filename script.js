function generarFolioManual() {

    const rfcContribuyente = document.getElementById("rfcContribuyente").value.trim();
    const rfcProveedor = document.getElementById("rfcProveedor").value.trim();
    const fecha = document.getElementById("fecha").value;

    if (!rfcContribuyente || !rfcProveedor || !fecha) {
        alert("Capture los RFC y seleccione la fecha.");
        return;
    }

    // Obtener el año de la fecha seleccionada
    const añoFolio = new Date(fecha).getFullYear();

    let ultimoAño = localStorage.getItem("anioFolio");
    let consecutivo = parseInt(localStorage.getItem("consecutivoFolio")) || 1;

    // Reiniciar el consecutivo cuando cambie el año
    if (ultimoAño != añoFolio) {
        consecutivo = 1;
    }

    const consecutivoFormateado = consecutivo.toString().padStart(5, "0");

const folio = `${rfcProveedor}${consecutivoFormateado}${añoFolio}`;

    document.getElementById("folio").value = folio;

    // Guardar el siguiente consecutivo
    localStorage.setItem("consecutivoFolio", consecutivo + 1);
    localStorage.setItem("anioFolio", añoFolio);
}
function generarXML() {
    

    let datos = {
        rfcContribuyente: document.getElementById("rfcContribuyente").value,
        rfcRepresentanteLegal: document.getElementById("rfcRepresentanteLegal").value,
        rfcProveedorDictamen: document.getElementById("rfcProveedor").value,
        rfcRepresentanteLegalProveedor: document.getElementById("rfcRepresentanteLegalProveedor").value,
        fechaEmisionDictamen: document.getElementById("fecha").value,
numeroFolioDictamen: document.getElementById("folio").value,
        Producto: document.getElementById("Producto").value,
        rfcPersonal: document.getElementById("rfcPersonal").value
    };

    let xml = `<?xml version="1.0" encoding="utf-8"?>
<Covol:Dictamen
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xmlns:Covol="https://repositorio.cloudb.sat.gob.mx/Covol/xml/Dictamen"
xsi:schemaLocation="https://repositorio.cloudb.sat.gob.mx/Covol/xml/Dictamen https://repositorio.cloudb.sat.gob.mx/Covol/xml/Dictamen.xsd">

<Covol:RfcContribuyente>${datos.rfcContribuyente}</Covol:RfcContribuyente>
<Covol:RfcRepresentanteLegal>${datos.rfcRepresentanteLegal}</Covol:RfcRepresentanteLegal>
<Covol:RfcProveedorDictamen>${datos.rfcProveedorDictamen}</Covol:RfcProveedorDictamen>
<Covol:RfcRepresentanteLegalProveedor>${datos.rfcRepresentanteLegalProveedor}</Covol:RfcRepresentanteLegalProveedor>

<Covol:InformacionPrueba>
<Covol:FechaEmisionDictamen>${datos.fechaEmisionDictamen}</Covol:FechaEmisionDictamen>
<Covol:NumeroFolioDictamen>${datos.numeroFolioDictamen}</Covol:NumeroFolioDictamen>
<Covol:Producto>${datos.Producto}</Covol:Producto>
<Covol:RfcPersonal>${datos.rfcPersonal}</Covol:RfcPersonal>
</Covol:InformacionPrueba>

</Covol:Dictamen>`;
  

    // Descargar el XML
    const blob = new Blob([xml], { type: "application/xml" });
    const url = URL.createObjectURL(blob);

    const enlace = document.createElement("a");
    enlace.href = url;

 enlace.download = `DI-${datos.rfcContribuyente}_${datos.numeroFolioDictamen}.xml`;

    document.body.appendChild(enlace);
    enlace.click();

    document.body.removeChild(enlace);
    URL.revokeObjectURL(url);
}