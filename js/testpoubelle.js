/*function addClickTrash()
{
let poubelle = document.querySelectorAll('section');//selectionne toute les sections
for (let elem of newPoub){//parcours la liste des sections 
    let pTitle = elem.querySelector('h2')[0].textContent;
    let pDescription = elem.querySelector('p')[0].textContent;
    let pDates = elem.getElementsByClassName('div-dates')[0].textContent;
    let pNameDate = elem.querySelector('h3')[0].textContent;
    let pCheckBox = elem.getElementsByClassName('div-checkbox')[0].textContent;//Extrait les contenus HTML des balises internes a la class card
}

}*/
const SECTION = document.querySelector('section')
const TRASH = document.getElementsByClassName(".trash");//appeler la classe du svg trash

TRASH.addEventListener('click',() =>{
    SECTION.remove();
//localStorage.getItem(POUB);
//localStorage.removeItem(POUB);

})