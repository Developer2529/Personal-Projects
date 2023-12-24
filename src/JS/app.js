//  variables
const directoryTable = document.querySelector("#directory-table");
const dataSearcherBox = document.querySelector("#my-input");
const projectSeacherInput = document.querySelector("#my-input-one");
const contactHTML = document.createElement("tr");
const projectsName = document.querySelector(".project-section");
let projectsTitles = document.querySelector(".projects-titles");
let hideBtn = document.querySelector(".arrow-back-left");
const categoryList = document.querySelectorAll(".projects-titles");

//////////Addeventlisteners /////////////////////
dataSearcherBox.addEventListener("input", (e) => {
  if (e.target.value.length === 0) return cargarTabla(dbTable);
  dataSearcher(e.target.value, dbTable);
});

document.addEventListener("DOMContentLoaded", () => {
  cargarTabla(dbTable);
  loadProjectData(dbProjects);
});

projectSeacherInput.addEventListener("input", searchProject);
projectsName.addEventListener("click", projectSelected);
hideBtn.addEventListener("click", showProjectsName);

////////////Funciones////////////////
function searchProject(e) {
  clearHTML2()
  dbProjects.filter((element) => {
    if (
      element.nombreProyecto
        .toUpperCase()
        .includes(e.target.value.toUpperCase())
    ) {
      
      makeProjectsList(element);
    } else if (e.target.value.length === 0) {
      return loadProjectData(dbProjects);
    }
  });
}

function clearHTML2() {
  while (projectsName && projectsName.children.length >= 3) {
    projectsName.removeChild(projectsName.children[2]);
  }
}

////////////funcion para crear tabla ////////////////
const makeTable = ({
  nombre,
  imagen,
  tarjeta,
  proyecto,
  extension,
  ubicacion,
  acciones,
}) => {
  
  const tbodyMainTR = document.createElement("TR");
  //column name
  const tdForNombre = document.createElement("TD");
  //Intranet Image
  const imgElement = document.createElement("IMG");

  imgElement.setAttribute("alt", "imagen Intranet2");
  imgElement.src = imagen;
  imgElement.classList.add("user-img");

  //paragraph tag for the td name
  const paragraphElement = document.createElement("P");

  paragraphElement.textContent = nombre;

  //column tarjeta
  const tdForTarjeta = document.createElement("TD");
  tdForTarjeta.textContent = tarjeta;

  //column proyecto
  const tdForProyecto = document.createElement("TD");
  tdForProyecto.textContent = proyecto;

  //column Extension
  const tdForExtension = document.createElement("TD");
  tdForExtension.textContent = extension;

  //column Ubicacion
  const tdForUbicacion = document.createElement("TD");
  tdForUbicacion.textContent = ubicacion;

  //colun Acciones
  const tdForAcciones = document.createElement("TD");

  //Menu Icon Image
  const imgIconMenu = document.createElement("IMG");
  imgIconMenu.setAttribute("alt", "imagen Hamburguer");
  imgIconMenu.src = acciones;
  imgIconMenu.classList.add("icon");

  directoryTable.appendChild(tbodyMainTR);
  tbodyMainTR.appendChild(tdForNombre);
  tdForNombre.appendChild(imgElement);
  tdForNombre.appendChild(paragraphElement);
  tbodyMainTR.appendChild(tdForTarjeta);
  tbodyMainTR.appendChild(tdForProyecto);
  tbodyMainTR.appendChild(tdForExtension);
  tbodyMainTR.appendChild(tdForUbicacion);
  tbodyMainTR.appendChild(tdForAcciones);
  tdForAcciones.appendChild(imgIconMenu);

  //insertar en el HTML
  directoryTable.appendChild(contactHTML);
};

function cargarTabla(dbTable) {
  clearHTML();

  dbTable.forEach((contact) => {
    makeTable(contact);
  });
}

//SEGUNDA FUNCION-OPCION, BUSCAR VALORES EN LA TABLA /////////////////
function dataSearcher(event, table) {
  clearHTML();
  table.filter((element) => {
    if (
      element.nombre.toUpperCase().includes(event.toUpperCase()) ||
      element.tarjeta.includes(event) ||
      element.proyecto.toUpperCase().includes(event.toUpperCase()) ||
      element.extension.includes(event) ||
      element.ubicacion.toUpperCase().includes(event.toUpperCase())
    ) {
      makeTable(element);
    }
  });
}

/////////TERCERA FUNCION, AQUI CARGA LA LISTA DE PROYECTOS //////////////
const makeProjectsList = ({ nombreProyecto, iconImage }) => {
  const projectsList = document.querySelector(".project-section");
  const divElement = document.createElement("DIV");
  const imageElement = document.createElement("IMG");
  const headingElement = document.createElement("H3");

  projectsList.appendChild(divElement);
  divElement.appendChild(imageElement);
  divElement.appendChild(headingElement);
  imageElement.src = iconImage;

  headingElement.textContent = nombreProyecto;
  headingElement.classList.add("projects-name-hide");

  divElement.classList.add("projects-div");
  imageElement.classList.add("icon");
  headingElement.classList.add("projects-titles");

  //insertar en el HTML
  projectsList.appendChild(divElement);
};

//aqui solo hago la lista de projectos desde js
function loadProjectData(dbProjects) {
  dbProjects.forEach((project) => {
    makeProjectsList(project);
  });
}

///segundo filtro de datos selecionando los proyectos
function projectSelected(e) {
  clearHTML();
  dbTable.forEach((area) => {
    if (e.target.textContent.includes(area.proyecto)) {
      makeTable(area);
    } else if (
      e.target.textContent.includes("Todos") ||
      e.target.textContent.includes("PROYECTOS") ||
      e.target.textContent == ""
    ) {
      cargarTabla(dbTable);
    }
  });
}

/////funcion para limpiar HTML de la tabla////////
function clearHTML() {
  while (directoryTable.firstChild) {
    directoryTable.removeChild(directoryTable.firstChild);
  }
}

/////////Ocultar los nombres de los proyectos /////////////
function showProjectsName() {
  cargarTabla(dbTable);

  // Get all elements with the specified class name
  const projectList = document.querySelectorAll(".projects-titles");

  // Convert the NodeList to an array (optional)
  const elementsArray = Array.from(projectList);

  // Now you can manipulate or filter the elementsArray as needed
  elementsArray.forEach(function (element) {
    element.classList.toggle("projects-name-hide");

    const tituloProyecto = document.querySelector(".proyecto-titulo");
    const mignifierIcon = document.querySelector(".magnifier-icon");
    tituloProyecto.style.color = "white";
    tituloProyecto.style.backgroundColor = "#b7202f";
    tituloProyecto.classList.add("animated-arrow-style");
    mignifierIcon.classList.add("magnifying-icon");

    const animatedArrowStyle = document.querySelector(".animated-arrow");
    animatedArrowStyle.classList.add("animated-arrow-style");

    if (projectsTitles.classList.contains("projects-name-hide")) {
      hideBtn.src = "/src/img/arrow_next_right_icon.png";
      animatedArrowStyle.classList.remove("animated-arrow-style");
      mignifierIcon.classList.remove("magnifying-icon");
    } else {
      hideBtn.src = "/src/img/arrow_back_left_icon.png";
    }
  });
}

// document.addEventListener('DOMContentLoaded', function() {
//   // Select all div elements with a last child h3 element
//   var divsWithLastH3 = document.querySelectorAll('div > h3:last-child');

//   // Iterate through the selected elements and print text content
//   divsWithLastH3.forEach(function(h3Element, index) {
//       console.log(h3Element.textContent);
//   });
// });

// const imgSelected = document.querySelector(".project-section-2")

// imgSelected.addEventListener("click", imgSelectedFunction)
//   // Select all div elements with a last child h3 element

//   function imgSelectedFunction (e) {
//   var divsWithLastH3 = document.querySelectorAll('div > img');

//   // Iterate through the selected elements and print text content
//   divsWithLastH3.forEach(function(h3Element) {

//      if(e.target.textContent.includes(h3Element.textContent)) {
//       console.log(e.target.textContent);
//      }else {"not found"}

//     cargarTabla(dbTable)
//     dbTable.filter(busca => {

//     //  console.log(e.target.textContent.includes(busca.proyecto));

//     })

//   });
// }
