const encrinorm = Object.freeze({
    'e': 'enter',
    'i': 'imes',
    'o': 'ober',
    'a': 'ai',
    'u': 'ufat'
});

const encriava = {
    a: '♦', b: '♣', c: '♥',d: '♠', e: '☼', f: '◘', g: '○',h: '◙', i: '♂', j: '♀',k: '♪',
    l: '♫', m: '☺', n: '☻', o: '■', p: '□', q: '▲', r: '△', s: '►',t: '◄', u: '↕',
    v: '↨', w: '→', x: '←', y: '↑', z: '↓'
};

function encriptarodese(text, type, modo) {
    if (modo === 'b') {
        for (const key in encriava) {
            if (type === 'encriptar') {
                text = text.replaceAll(key, encriava[key]);
            }
            if (type === 'desencriptar') {
                text = text.replaceAll(encriava[key], key);
            }
        }
    } else {
        for (const key in encrinorm) {
            if (type === 'encriptar') {
                text = text.replaceAll(key, encrinorm[key]);
            }
            if (type === 'desencriptar') {
                text = text.replaceAll(encrinorm[key], key);
            }
        }
    }
    return text;
}

//activacion del modo pro usando el switch (este modifica la funcion y los codigos usados
// en pocas palabras es un encriptador con mas elementos codificables)
const switchInput = document.getElementById('toggleSwitch');
const switchLabel = document.getElementById('desc-boton');
const container = document.getElementById('rectangulo1');
const titulologo = document.getElementById("titulologo");
const corazon = document.getElementById('corazon');
const body = document.body;
var modo = 'a';
switchInput.addEventListener('change', () => {
    if (switchInput.checked) {
        body.style.backgroundColor = '#1f1f1f';
        switchLabel.style.color = '#E5E5E5';
        container.style.filter = 'invert(90%)';
        switchLabel.textContent = 'Modo PRO activado';
        titulologo.style.color= '#E5E5E5';
        corazon.style.filter = 'invert(100%)';
        modo = 'b';
    } else {
        body.style.backgroundColor = '#E5E5E5';
        switchLabel.style.color = '#1f1f1f' ;
        switchLabel.textContent = 'Activar modo PRO';
        container.style.filter = 'invert(0%)';
        titulologo.style.color= '#1f1f1f';
        modo = 'a';
    }
});

function copiar() {
    var textoCopiado = document.getElementById("textoReemplazado").textContent;
    navigator.clipboard.writeText(textoCopiado);
    var elemento = document.getElementById("mensaje-copiado");
    elemento.style.opacity = "1"; // Restablece la opacidad
    elemento.style.display = "block"; // Hace visible el elemento

    //desvanecimiento difuminado
    setTimeout(function () {
        for (var i = 0; i <= 100; i++) {
            let j = 1 - (i / 100);
            elemento.style.opacity = j;
        }

        elemento.style.display = "none"; // Oculta el elemento después de desvanecerse
    }, 5000);
}

function reemplazar() {
    //eliminacion de todos los elementos visibles en el contenedor
    const elements = container.children;
    for (let i = elements.length - 1; i >= 0; i--) {
        const element = elements[i];
        if (element.id !== 'textoReemplazado' && element.id !== 'botonCopiar') {
            container.removeChild(element);
        }
    }
    // creacion del boton para copiar, si este no existe previamente
    if (!document.getElementById('botonCopiar')) {
        var boton = document.createElement("button");
        boton.id = "botonCopiar";
        boton.innerHTML = "Copiar";
        boton.onclick = copiar;
        container.appendChild(boton);
    }
}

function encriptar() {
    reemplazar();
    //modificacion del elemento que sera el texto mostrado, volviendolo visible y agregando el texto
    // que se encripto
    const h1 = document.getElementById("textoReemplazado");
    var nuevoTexto = document.getElementById("textoNuevo").value;
    var textoEncriptado = encriptarodese(nuevoTexto, 'encriptar', modo);
    h1.textContent = textoEncriptado;
    h1.style.display = "block";
}

function desencriptar() {
    reemplazar();
    //modificacion del elemento que sera el texto mostrado, volviendolo visible y agregando el texto
    // que se encripto
    const h1 = document.getElementById("textoReemplazado");
    var nuevoTexto = document.getElementById("textoNuevo").value;
    var textoDesencriptado = encriptarodese(nuevoTexto, 'desencriptar', modo);
    h1.textContent = textoDesencriptado;
    h1.style.display = "block";
}