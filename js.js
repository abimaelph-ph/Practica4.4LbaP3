let menuData = [];


const inicializarApp = () => {
    const jsonSimulado = {
        "menu_config": [
            { "id": 101, "nombre": "Inicio", "enlace": "/inicio" },
            { "id": 102, "nombre": "Sobre Nosotros", "enlace": "/nosotros" },
            { "id": 103, "nombre": "Servicios", "enlace": "/servicios" }
        ]
    };
    menuData = jsonSimulado.menu_config;
    renderizarMenu();
};


const renderizarMenu = () => {
    const contenedor = document.getElementById('menu-container');
    contenedor.innerHTML = '';

    menuData.forEach(item => {
        const div = document.createElement('div');
        div.className = 'menu-card';
        div.innerHTML = `
            <a href="${item.enlace}" target="_blank">🔗 ${item.nombre}</a>
            <div class="card-actions">
                <button class="small btn-edit" onclick="controladorEditar(${item.id})">Modificar</button>
                <button class="small btn-delete" onclick="controladorEliminar(${item.id})">Eliminar</button>
            </div>
        `;
        contenedor.appendChild(div);
    });
};


const esUrlValida = (string) => {
    
    return string.startsWith('/') || string.startsWith('http');
};

const sanitizarInput = (str) => {
    
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
};


const controladorAgregar = () => {
    const nombreRaw = document.getElementById('in-nombre').value;
    const enlaceRaw = document.getElementById('in-enlace').value;

    if (!nombreRaw || !enlaceRaw) {
        alert("Error: Complete todos los campos.");
        return;
    }

    if (!esUrlValida(enlaceRaw)) {
        alert("Error: El enlace debe iniciar con '/' o 'http'.");
        return;
    }

    const nuevoItem = {
        id: Date.now(), 
        nombre: sanitizarInput(nombreRaw),
        enlace: sanitizarInput(enlaceRaw)
    };

    menuData.push(nuevoItem);
    document.getElementById('in-nombre').value = '';
    document.getElementById('in-enlace').value = '';
    renderizarMenu();
};


const controladorEditar = (id) => {
    const item = menuData.find(i => i.id === id);
    if (item) {
        const nuevoNombre = prompt("Nuevo nombre:", item.nombre);
        const nuevoEnlace = prompt("Nuevo enlace:", item.enlace);

        if (nuevoNombre && nuevoEnlace && esUrlValida(nuevoEnlace)) {
            item.nombre = sanitizarInput(nuevoNombre);
            item.enlace = sanitizarInput(nuevoEnlace);
            renderizarMenu();
        } else {
            alert("Cambios no guardados: Datos inválidos.");
        }
    }
};


const controladorEliminar = (id) => {
    if (confirm("¿Desea eliminar esta opción del menú?")) {
        menuData = menuData.filter(i => i.id !== id);
        renderizarMenu();
    }
};


window.onload = inicializarApp;