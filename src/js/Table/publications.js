import {
  clearElement,
  addToTable,
  expand,
  exist,
  addArrtoTable,
} from "../utils";

//funcion que se encarga de hacer la busqueda por titulo en publicaciones
export const searchOnTablePublications = (json,filtersAuthors) => {
  var input, filter;
  //cogemos lo que escribe el usuario
  input = document.getElementById("myInputPublications");
  //lo pasamos a mayusuculas
  filter = input.value.toUpperCase();

  //desactivo paginacion

  /* if(input === "")
         document.getElementsByClassName("pages").classList.remove("non-display");*/

  var dataTableElements = document.querySelector("#dataTablePublications");
  //borramos la tabla para poder mostrar las cosas sin que se solapen
  clearElement(dataTableElements);

  for (let index = 0; index < json.publications.length; ++index) {
    if (json.publications[index].title.toUpperCase().includes(filter))
      auxPublicationsWrite(json, index, dataTableElements,filtersAuthors);
  }
};

//funcion que se encarga de escribir las publicaciones en la tabla
export function writePublicationOnTable(
  json,
  paginaActualPublicaciones,
  articulosPorPaginaPublicaciones,
  filtersAuthors
) {
  var nPublicaciones =
    paginaActualPublicaciones * articulosPorPaginaPublicaciones;
  //cogemos todas las filas de la tabla , nos ponemos en la ultima y vamos añadiendo segun leemos el json
  var dataTableElements = document.querySelector("#dataTablePublications");
  //borramos la tabla para poder mostrar las cosas sin que se solapen
  clearElement(dataTableElements);

  var inicio =
    (paginaActualPublicaciones - 1) * articulosPorPaginaPublicaciones;
  var elm = json.publications[0];

  for (
    let index = inicio;
    index < nPublicaciones && elm !== undefined;
    ++index
  ) {
    auxPublicationsWrite(json, index, dataTableElements, filtersAuthors);
  }
}

//funcion auxiliar que se usa para escribir publicaciones en la tabla publications
function auxPublicationsWrite(json, index, dataTableElements, filtersAuthors) {
  var elm = json.publications[index];
  if (elm !== undefined) {
    let tableHead = document.createElement("tr");
    //--- type ---
    addToTable(elm.type, tableHead);

    //--- autores ---
    //Creamos las filas de las tablas y en la de autores creamos una lista
    let tdAuthors = document.createElement("td");
    let ulAuthors = document.createElement("ul");
    elm.authors.forEach((author, i) => {
      //Para una funcionalidad de js solo debo mostrar 2 autores y con el click mostrar todos
      let li = document.createElement("li");
      li.innerText = "■ " + author;
      //cuando haya mas de dos les añadimos una clase non-display que no dejara que se vea
      if (i > 1) li.classList.add("non-display");

      ulAuthors.appendChild(li);

      if (i === elm.authors.length - 1 && elm.authors.length > 2) {
        let showMore = document.createElement("li");
        showMore.innerText = "Show more...";
        showMore.classList.add("show");
        showMore.classList.add("blue-text");
        ulAuthors.appendChild(showMore);
      }
    });
    tdAuthors.classList.add("authors_");
    tdAuthors.setAttribute("list", "true");
    tdAuthors.appendChild(ulAuthors);
    tableHead.appendChild(tdAuthors);

    //--- title ---
    let tdTitle = document.createElement("td");
    tdTitle.innerText = exist(elm.title);
    tdTitle.classList.add("title_");
    tdTitle.setAttribute("list", "false");
    tableHead.appendChild(tdTitle);

    //--- pages ---
    addToTable(elm.pages, tableHead);

    //--- year ---
    addToTable(elm.year, tableHead);

    //--- Volume ---
    addToTable(elm.volume, tableHead);

    //--- Issue ---
    addToTable(elm.issue, tableHead);

    //--- (A)Journal/(I)Book_title ---
    if (elm.type === "Articles") {
      addToTable(elm.journal, tableHead);
    } else {
      //--- book title ---
      addToTable(elm.book_title, tableHead);
    }

    //--- acronym ---
    addToTable(elm.acronym, tableHead);

    //---Core---
    if (elm.core !== undefined)
      addArrtoTable(elm.core, tableHead, filtersAuthors["checkCore"]);
    else addToTable("No data", tableHead);

    //--- Ggs ---
    if (elm.ggs !== undefined)
      addArrtoTable(elm.ggs, tableHead, filtersAuthors["checkGGS"]);
    else addToTable("No data", tableHead);

    //---Citas---
    if (elm.citas !== undefined)
      addArrtoTable(elm.citas, tableHead, filtersAuthors["checkGGS"]);
    else addToTable("No data", tableHead);

    //---JCR---
    let tdJcr = document.createElement("td");
    let ulJcr = document.createElement("ul");
    let liJcr1=document.createElement("li");
    if(elm.jcr !== undefined){
      liJcr1.innerText=elm.jcr.categoria !== undefined ?  "categoria: " + elm.jcr.categoria : "-";
      ulJcr.appendChild(liJcr1);
      let liJcr2=document.createElement("li");
      liJcr2.innerText=elm.jcr.impact_factor !== undefined ? "impact_factor: " + elm.jcr.impact_factor : "-";
      ulJcr.appendChild(liJcr2);
      let liJcr3=document.createElement("li");
      liJcr3.innerText=elm.jcr.position !== undefined ? "position: " + elm.jcr.position : "-";
      ulJcr.appendChild(liJcr3);
      let liJcr4=document.createElement("li");
      liJcr4.innerText=elm.jcr.quartile !== undefined ? "quartile: " + elm.jcr.quartile : "-";
      ulJcr.appendChild(liJcr4);
      tdJcr.appendChild(ulJcr);
    }else{
      tdJcr.innerHTML="No data";
    }
    tableHead.appendChild(tdJcr);

    //se le agrega la funcionalidad de desplegado a cada fila
    let liAuthors = tableHead.querySelectorAll(".authors_ ul > li");
    tableHead.onclick = () => expand(liAuthors);
    //Se agrega toda la fila a la tabla
    dataTableElements.appendChild(tableHead);
  }
}
