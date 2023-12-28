//  variables
const directoryTable = document.querySelector("#directory-table");
const dataSearcherBox = document.querySelector("#my-input");

const contactHTML = document.createElement("tr");
const projectsName = document.querySelector(".main-project-div");
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

projectsName.addEventListener("click", projectSelected);

hideBtn.addEventListener("click", showProjectsName);

//*Funciones
const makeTable = ({
  nombre,
  imagen,
  tarjeta,
  proyecto,
  extension,
  ubicacion,
  acciones,
}) => {
  ////////////variables ////////////////
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
  const projectsList = document.querySelector(".main-project-div");
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
// function projectSelected(e) {
//   clearHTML();
//   dbTable.forEach((area) => {
//     if (e.target.textContent.includes(area.proyecto)) {
//       makeTable(area);
//     } else if (
//       e.target.textContent.includes("Todos") ||
//       e.target.textContent.includes("PROYECTOS") ||
//       e.target.textContent == ""
//     ) {
//       cargarTabla(dbTable);
//     }
//   });
// }

function projectSelected(e) {  
  let h3TextCaptured = e.target.innerHTML 
  clearHTML();
  dbTable.forEach(area => {
    let tagname = e.target.tagName
    if (tagname === "IMG") {
      const imgTextCaptured = e.target.nextElementSibling.textContent;
      if (imgTextCaptured.includes(area.proyecto)) {
         return makeTable(area);
         } else if (imgTextCaptured.includes("Todos")) {
          return cargarTabla(dbTable)
        } 
              
    } else if (h3TextCaptured.includes(area.proyecto)) {
      return makeTable(area);
    }
    
    else if (
      h3TextCaptured.includes("Todos") ||
      h3TextCaptured.includes("PROYECTOS") ||
      h3TextCaptured.textContent == ""
    ) {
      return cargarTabla(dbTable)
    }
  })
  
}

//*funcion para limpiar HTML de la tabla
function clearHTML() {
  while (directoryTable.firstChild) {
    directoryTable.removeChild(directoryTable.firstChild);
  }
}

///ocultar los nombres de los proyectos /////////////
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
    tituloProyecto.style.color = "white";
    tituloProyecto.style.backgroundColor = "#b7202f";
    tituloProyecto.classList.add("animated-arrow-style");

    const animatedArrowStyle = document.querySelector(".animated-arrow");
    const MainSection = document.querySelector(".main-section-container")
    animatedArrowStyle.classList.add("animated-arrow-style");

    if (!projectsTitles.classList.contains("projects-name-hide")) {
        hideBtn.src = "/src/img/arrow_back_left_icon.png";
          MainSection.style.width = "1050px"
          document.querySelector("table").style.width = "780px"
          document.querySelector(".th-box").style.fontSize = "12px"
          document.querySelector("tbody").style.fontSize = "14px"
            
          
          
    } else if (projectsTitles.classList.contains("projects-name-hide")){
      hideBtn.src = "/src/img/arrow_next_right_icon.png";
      animatedArrowStyle.classList.remove("animated-arrow-style");
      MainSection.style.width = "620px"
      document.querySelector("table").style.width = "528px"
      document.querySelector("tbody").style.color = "";
      document.querySelector("tbody").style.fontSize = "11px"
      document.querySelector(".th-box").style.fontSize = "10px"

    
    }
  });
}

// console.log(divsWithLastH3[2].alt == "Redes Sociales");
// console.log(divsWithLastH3[2].nextElementSibling.textContent)
// const divsWithLastH3 = document.querySelectorAll('div > h3:last-child');
// console.log(divsWithLastH3[2].nextElementSibling.textContent)


// const divsWithLastH3 = document.getElementsByTagName('img');
// document.addEventListener("click", imgSelectedFunction)

// function imgSelectedFunction (e) {
//   console.log(e.target.nextElementSibling.textContent);
// }

// projectsName.addEventListener("click", textSelectedFunction)
// function textSelectedFunction (e) {
//   // console.log(e.target.textContent.includes("Redes"));
//   console.log(e.target.innerHTML.includes("Redes Sociales"));
// }


// const imageSelect = document.querySelector('img');
// imageSelect.addEventListener("click",projectSelected)
  

// function projectSelected(e) {
  
 
//   clearHTML();

//   dbTable.forEach(area => {
//     // console.log(e.target.tagName);
//     let imgTextCaptured = e.target.nextElementSibling.textContent; 
//     let h3TextCaptured = e.target.innerHTML; 
//     if (imgTextCaptured.includes(area.proyecto)) {
//       return makeTable(area);
//     } else if (      
//       h3TextCaptured.includes(area.proyecto)) {
//       return makeTable(area);
//     } else if ( 
//       imgTextCaptured.includes("Todos") ||
//       imgTextCaptured.includes("PROYECTOS") ||
//         imgTextCaptured.textContent == ""
//     ) {
//       cargarTabla(dbTable);
//     }
//   });
// }
  















// const imgSelected = document.getElementsByClassName("icon")

// imgSelected.addEventListener("click", imgSelectedFunction)

// function imgSelectedFunction (e) {

// console.log(imgSelected);


//     for (let i = 0; i < imgSelected.length; i++) {
//       const element = imgSelected[i].nextElementSibling
//       console.log(element.textContent);
//     }
//   }


//   // Select all div elements with a last child h3 element

//   function imgSelectedFunction (e) {
   
//     const acceso2 = document.querySelectorAll("div h3")
//     const objetivo = e.target.textContent
//     console.log(objetivo);
//     console.log(objetivo);
    
//     // for (let i = 0; i < acceso2.length; i++) {
//     //   const element = acceso2[i].textContent;
//     //   console.log(element);
//     // }

//   }

