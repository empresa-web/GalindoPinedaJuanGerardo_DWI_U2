// Función para alternar la visibilidad de un programa según su ID
function toggleProgram(programId) {
    // Obtener el elemento del programa por su ID
    var program = document.getElementById(programId);
    // Verificar si el programa está oculto
    if (program.style.display === "none") {
        // Si está oculto, mostrarlo cambiando su estilo a "block"
        program.style.display = "block";
    } else {
        // Si está visible, ocultarlo cambiando su estilo a "none"
        program.style.display = "none";
    }
}

// Función para agregar elementos dinámicamente al primer programa
function agregarElemento() {
    // Contar cuántos elementos de párrafo ya existen en el contenedor
    var elementos = document.querySelectorAll('#puntosContainer p').length;
    // Verificar si se han agregado menos de 5 puntos
    if (elementos < 5) {
        // Crear un nuevo elemento de párrafo
        var nuevoElemento = document.createElement("p");
        // Definir el contenido del nuevo elemento
        var puntos = [
            // Lista de puntos específicos del primer programa
            "1. Colaboración con hospitales y familias: La fundación se comunica con hospitales y familias para identificar los sueños y anhelos de los niños. Esto les permite organizar actividades o experiencias significativas que cumplan con esos deseos internos.",
            "2. Eventos y actividades personalizadas: Realizan eventos y actividades adaptadas a las necesidades y preferencias de cada niño. Pueden incluir visitas a parques temáticos, encuentros con personajes favoritos o experiencias culturales.",
            "3. Voluntarios comprometidos: La fundación cuenta con voluntarios dedicados que se esfuerzan por crear un ambiente especial y lleno de alegría para los niños. Su compromiso es fundamental para el éxito de cada evento.",
            "4. Apoyo emocional: Además de cumplir deseos, brindan apoyo emocional a los niños y sus familias. Escuchan sus historias y les ofrecen palabras de aliento y esperanza.",
            "5. Enfoque en la felicidad: La fundación se centra en crear momentos felices y significativos para los niños, independientemente de su situación de salud."
        ];
        // Agregar el texto correspondiente al número de elementos ya agregados
        nuevoElemento.innerText = puntos[elementos];
        // Agregar el nuevo elemento al contenedor dinámico
        document.getElementById("puntosContainer").appendChild(nuevoElemento);
    } else {
        // Mostrar una alerta si ya se han agregado los 5 puntos
        alert("Ya has conocido como se aplica.");
    }
}

// Función para agregar elementos dinámicamente al segundo programa
function agregarElemento2() {
    // Contar cuántos elementos ya existen en el contenedor del segundo programa
    var elementos = document.querySelectorAll('#puntosContainer2 p').length;
    // Verificar si se han agregado menos de 5 puntos
    if (elementos < 5) {
        // Crear un nuevo elemento de párrafo
        var nuevoElemento = document.createElement("p");
        // Definir el contenido del nuevo elemento
        var puntos = [
            // Lista de puntos específicos del segundo programa
            "1. Talleres de habilidades: Las madres participan en talleres que les enseñan habilidades prácticas, como costura, cocina o manualidades. Esto les permite generar ingresos y mejorar su calidad de vida.",
            "2. Educación financiera: Se imparten talleres sobre manejo del dinero, ahorro y presupuesto. Las madres aprenden a administrar sus recursos de manera efectiva.",
            "3. Salud y nutrición: La fundación ofrece charlas sobre salud y nutrición para que las madres cuiden mejor de sus hijos. Esto incluye información sobre alimentación balanceada y prevención de enfermedades.",
            "4. Empoderamiento: A través de los talleres, las madres adquieren conocimientos y habilidades que les dan confianza y empoderamiento. Pueden tomar decisiones informadas para el bienestar de sus familias.",
            "5. Red de apoyo: La fundación crea una red de apoyo entre las madres, fomentando la solidaridad y el intercambio de experiencias. Esto fortalece su capacidad para enfrentar desafíos."
        ];
        // Agregar el texto correspondiente al número de elementos ya agregados
        nuevoElemento.innerText = puntos[elementos];
        // Agregar el nuevo elemento al contenedor dinámico del segundo programa
        document.getElementById("puntosContainer2").appendChild(nuevoElemento);
    } else {
        // Mostrar una alerta si ya se han agregado los 5 puntos
        alert("Ya has conocido como se aplica.");
    }
}

// Función para mostrar los detalles de una donación específica
function showDetails(id) {
    // Ocultar todas las secciones de detalles
    var details = document.querySelectorAll('.donation-details .hidden-details-content');
    details.forEach(function(detail) {
        // Remover la clase 'show' de todos los detalles
        detail.classList.remove('show');
    });

    // Mostrar solo la sección de detalles correspondiente al tipo de donación seleccionado
    var selectedDetails = document.getElementById(id);
    selectedDetails.classList.add('show');
}

// Función para limpiar el formulario de donación
function limpiarFormulario() {
    // Resetear el formulario de donación
    document.getElementById("formularioDonacion").reset();
}

// Configuración del textarea del motivo
window.onload = function() {
    var motivoTextarea = document.getElementById("motivo");
    var defaultText = "Si no quiere redactar su Motivo, solo escriba NO APLICA";

    // Establecer el valor predeterminado y opacidad del textarea
    motivoTextarea.value = defaultText;
    motivoTextarea.style.opacity = "0.5";

    // Manejar eventos para el textarea
    motivoTextarea.addEventListener("click", function() {
        this.value = "";
        this.style.opacity = "1";
    });

    motivoTextarea.addEventListener("input", function() {
        if (this.value.trim() !== "") {
            this.style.opacity = "1";
        }
    });

    motivoTextarea.addEventListener("blur", function() {
        if (this.value.trim() === "") {
            this.value = defaultText;
            this.style.opacity = "0.5";
        }
    });
};

// Validación de checkboxes y envío de formulario
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("donationForm");
    
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevenir el envío real del formulario
        
        // Obtener valores de los campos del formulario
        const nombre = document.getElementById("nombre").value.trim();
        const email = document.getElementById("email").value.trim();
        const monto = document.getElementById("monto").value.trim();
        
        // Obtener las selecciones de los checkboxes
        const checkboxesPago = document.querySelectorAll('input[name="metodo_pago"]');
        const checkboxesContacto = document.querySelectorAll('input[name="preferencias_contacto"]');
        
        // Verifica si al menos un método de pago y una preferencia de contacto están seleccionados
        const anyMetodoPagoChecked = Array.from(checkboxesPago).some(checkbox => checkbox.checked);
        const anyPreferenciasContactoChecked = Array.from(checkboxesContacto).some(checkbox => checkbox.checked);
        
        // Valida si todos los campos requeridos están completos
        if (nombre !== "" && email !== "" && monto !== "" && anyMetodoPagoChecked && anyPreferenciasContactoChecked) {
            // Si los campos están completos, mostrar un mensaje de agradecimiento
            const mensaje = `¡Gracias por tu donación!\n\nTu generosidad hace una gran diferencia. Hemos recibido tu contribución de ${monto} ${monto < 1 ? 'centavos' : 'Pesos'}. Un correo de confirmación ha sido enviado a ${email} con los detalles de tu donación.\n\nGracias por apoyar nuestra causa. Juntos, estamos marcando una diferencia.`;
            alert(mensaje);
        } else {
            // Si falta algún campo requerido, mostrar una alerta solicitando completar todos los campos
            alert("Por favor, completa todos los campos requeridos y selecciona un método de pago y una preferencia de contacto antes de enviar el formulario.");
        }
    });
});
