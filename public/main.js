// La función principal del main es:
// 1. Obtiene los valores del formulario 
// 2. Valida que los campos tengan información
// 3. La función fetch hace las peticiones al servidor
// 4. /calcular-promedio es la ruta a donde se están enviando la petición
// 5. method: 'POST' → Vamos a enviar datos
// 6. headers → Estamos enviando JSON
// 7. body → Aquí van los datos convertidos a texto JSON

document.getElementById('btnCalcular').addEventListener('click', () => {
    const nombre = document.getElementById('nombre').value;
    const unidad1 = document.getElementById('unidad1').value;
    const unidad2 = document.getElementById('unidad2').value;
    const unidad3 = document.getElementById('unidad3').value;
    
    if (!nombre || !unidad1 || !unidad2 || !unidad3) {
        alert('Por favor completa todos los campos');
        return;
    }
    
    fetch('/calcular-promedio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nombre,
            unidad1,
            unidad2,
            unidad3
        })
    })
    .then(res => res.json())
    .then(data => {
        // Mostrar el contenedor de resultados
        document.getElementById('resultadoContainer').classList.remove('hidden');
        
        // Actualizar los valores
        document.getElementById('promedio').value = data.promedio.toFixed(2);
        document.getElementById('estatus').value = data.estatus;
        
        // Cambiar el color del estatus según si aprobó o reprobó
        const estatusInput = document.getElementById('estatus');
        if (data.estatus === 'Aprobado') {
            estatusInput.style.backgroundColor = '#10b981';
            estatusInput.style.color = 'white';
        } else {
            estatusInput.style.backgroundColor = '#ef4444';
            estatusInput.style.color = 'white';
        }
        
        // Scroll suave hacia resultados
        document.getElementById('resultadoContainer').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest' 
        });
    })
    .catch(err => console.error(err));
});

// Botón para limpiar las cajas del formulario
document.getElementById('btnLimpiar').addEventListener('click', () => {
    // Limpiar campos del formulario
    document.getElementById('nombre').value = '';
    document.getElementById('unidad1').value = '';
    document.getElementById('unidad2').value = '';
    document.getElementById('unidad3').value = '';
    
    // Limpiar resultados
    document.getElementById('promedio').value = '';
    document.getElementById('estatus').value = '';
    
    // Ocultar contenedor de resultados
    document.getElementById('resultadoContainer').classList.add('hidden');
    
    // Enfocar el primer campo
    document.getElementById('nombre').focus();
});

// Validación en tiempo real para que no se pasen de 10
const inputs = document.querySelectorAll('input[type="number"]');
inputs.forEach(input => {
    input.addEventListener('input', (e) => {
        const value = parseFloat(e.target.value);
        if (value > 10) {
            e.target.value = 10;
        } else if (value < 0) {
            e.target.value = 0;
        }
    });
});