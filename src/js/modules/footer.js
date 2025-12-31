function generarFooter() {
    const anioActual = new Date().getFullYear();

    const footerHTML = `
        <footer class="bg-dark text-light pt-4 pb-3">
            <div class="container">
                <div class="row">
                    <div class="col-md-4">
                        <h5 class="fw-bold">BlocNotas</h5>
                        <p class="text-secondary small">
                        Cada día, generando y alamcenado recuerdos.
                        </p>
                    </div>
                    <div class="col-md-4">
                        <h6 class="fw-semibold">Navegación</h6>
                        <ul class="list-unstyled">
                        <li><a href="#" class="text-secondary text-decoration-none">Crear nota</a></li>
                        <li><a href="#" class="text-secondary text-decoration-none">Mis notas</a></li>
                        <li><a href="#" class="text-secondary text-decoration-none">Cerrar sesión</a></li>
                        </ul>
                    </div>
                    <div class="col-md-4">
                        <h6 class="fw-semibold">Proyecto</h6>
                        <p class="text-secondary small mb-1">Hecho con Bootstrap y Supabase</p>
                        <p class="text-secondary small">© ${anioActual} BlocNotas</p>
                    </div>
                </div>

                <hr class="border-secondary">

                <div class="text-center text-secondary small">
                    Diseñado para crecer, no para olvidar.
                </div>
            </div>
        </footer>
    `;

    return footerHTML;
}

// Cargar footer en el elemento con id="footer"
function cargarFooter() {
    const footerContainer = document.getElementById('footer');
    if (footerContainer) {
        footerContainer.innerHTML = generarFooter();
    }
}

export { cargarFooter };