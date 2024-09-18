
// Crear una nueva lista de tareas
class Grafo {
    constructor() {
        this.adjacencia = new Map();  // Un mapa para almacenar listas de adyacencia
    }

    // Método para agregar un nodo (vértice) al grafo
    agregarNodo(nodo) {
        if (!this.adjacencia.has(nodo)) {
            this.adjacencia.set(nodo, []);
        }
    }

    // Método para agregar una arista (con peso) entre dos nodos
    agregarArista(nodo1, nodo2, peso = 1) {
        if (!this.adjacencia.has(nodo1)) {
            this.agregarNodo(nodo1);
        }
        if (!this.adjacencia.has(nodo2)) {
            this.agregarNodo(nodo2);
        }
        this.adjacencia.get(nodo1).push({ destino: nodo2, peso });
        this.adjacencia.get(nodo2).push({ destino: nodo1, peso });
    }

    // Mostrar el grafo (nodos y sus aristas)
    mostrarGrafo() {
        for (let [nodo, aristas] of this.adjacencia) {
            let conexiones = aristas.map(arista => `${arista.destino} : ${arista.peso}`).join(", ");
            console.log(`${nodo} está conectado a: ${conexiones}`);
            const ciudad = {};
            //Arreglo para pasarselo a la función graficadora
            for (let [nodo, aristas] of this.adjacencia) {
                ciudad[nodo] = {};
                aristas.forEach(arista => {
                ciudad[nodo][arista.destino] = arista.peso;
             });
            }
           //   console.log(ciudad);
            return ciudad;
            }  
        }
    }

// Crear un nuevo grafo  
const grafodibujo = document.getElementById('graph');
const grafo = new Grafo();


function dibujarGrafo() {
    const ciudades = grafo.mostrarGrafo();
    const width = grafodibujo.clientWidth;
    const height = grafodibujo.clientHeight;

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    grafodibujo.appendChild(svg);

    const listaCiudad = Object.keys(ciudades);
    const radio = 20;
    const positions = {};
    //console.log(listaCiudad)
    // Asignar posiciones a las ciudades
    listaCiudad.forEach((city, index) => {
        const pos = (index / listaCiudad.length) * 2 * Math.PI;
        const x = width / 2 + Math.cos(pos) * (width / 3);
        const y = height / 2 + Math.sin(pos) * (height / 3);
        positions[city] = { x, y };

        // Crear un círculo para cada ciudad
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", x);
        circle.setAttribute("cy", y);
        circle.setAttribute("r", radio);
        circle.setAttribute("fill", "#69b3a2");
        circle.setAttribute("stroke", "#333");
        circle.setAttribute("stroke-width", 2);
        svg.appendChild(circle);

        // Añadir el nombre de la ciudad
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", x);
        text.setAttribute("y", y + 5); // Ajustar la posición vertical
        text.setAttribute("text-anchor", "middle");
        text.textContent = city;
        svg.appendChild(text);
    });

    // Dibujar las conexiones
    for (const city in ciudades) {
        const conexiones = ciudades[city];
        for (const target in conexiones) {
            const startPos = positions[city];
            const endPos = positions[target];

            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", startPos.x);
            line.setAttribute("y1", startPos.y);
            line.setAttribute("x2", endPos.x);
            line.setAttribute("y2", endPos.y);
            line.setAttribute("stroke", "#999");
            line.setAttribute("stroke-width", 2);
            svg.appendChild(line);
        

        // Añadir el peso en el medio de la línea
        const midX = (startPos.x + endPos.x) / 2;
        const midY = (startPos.y + endPos.y) / 2;
        const weightText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        weightText.setAttribute("x", midX);
        weightText.setAttribute("y", midY - 5); // Ajustar la posición vertical
        weightText.setAttribute("class", "text");
        weightText.textContent = conexiones[target];
        svg.appendChild(weightText);
        }
    }
}


document.getElementById('mostrar').addEventListener('click',function(event){
    event.preventDefault();
    const nodo1 = document.getElementById('ciudad1').value;
    console.log('Nombre:', nodo1);
    const nodo2 = document.getElementById('ciudad2').value;
    const peso = parseInt(document.getElementById('distancia').value);

    grafo.agregarArista(nodo1, nodo2, peso);
    // Mostrar la estructura del grafo
    console.log("Estructura del grafo:");
    grafo.mostrarGrafo()
    dibujarGrafo();
    document.getElementById('graph').reset();
});


// Agregar nodos y aristas con sus pesos
grafo.agregarArista('A', 'B', 5);
grafo.agregarArista('A', 'C', 3);




