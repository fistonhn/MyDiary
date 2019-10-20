
const savebtn=document.querySelector('#diary-btn');
const newEntry=document.querySelector('.card');
const editBtn=document.querySelector('.read-btn');
const form = document.querySelector('.newstory-form');
const bodyContainer = document.querySelector('.dashboard-general');
const addEntry = document.querySelector('.add-entry');
const MyEntryBtn = document.querySelector('#myEntries-btn');
const navContainer = document.querySelector('.container');
const textArea = document.querySelector('.diary__content')
const deleteDefBtn = document.querySelector('.delete-btn')


MyEntryBtn.addEventListener('click',dashboardBtn)
addEntry.addEventListener('click',addStory);
editBtn.addEventListener('click',editDiary);
deleteDefBtn.addEventListener('click',removeDefEntry);
savebtn.addEventListener('click',saveEntry);


function dashboardBtn(e){
    e.preventDefault;
    bodyContainer.removeChild(form);
    bodyContainer.appendChild(newEntry);

}


function addStory(e){
    e.preventDefault;
    bodyContainer.appendChild(form);
    bodyContainer.removeChild(newEntry);

}

function saveEntry(e){
    e.preventDefault();

    bodyContainer.appendChild(newEntry);
    let li=document.createElement('li');
    li.className= 'card-container';


    const newTitle= document.querySelector('.diary__title').value;
    const newContent=document.querySelector('.diary__content').value;
    if(newTitle.length==0 || newContent.length==0){

            //  popup message

    const popup = document.createElement('span');
    popup.className = 'popup-text';

    popup.appendChild(document.createTextNode('fill title and description!'))  
       
    navContainer.appendChild(popup)

        savebtn.classList.toggle("show")

        setTimeout(() => {
            navContainer.removeChild(popup);
          }, 3000);
    
    }
    else{
    const btncontainer=document.createElement('div')
    const title=document.createElement('div1')
    const content=document.createElement('div2')
    const deleteBtn= document.createElement('span');
    const editBtn= document.createElement('span');
    
    btncontainer.className='new-btn'
    title.className='new-title-diary'
    content.className='new-content-diary'
    editBtn.className='editNew'
    deleteBtn.className='deleteNew'
    

    title.appendChild(document.createTextNode(newTitle))
    content.appendChild(document.createTextNode(newContent))
    deleteBtn.appendChild(document.createTextNode('DELETE STORY'))
    editBtn.appendChild(document.createTextNode('EDIT STORY'))
    
    btncontainer.appendChild(editBtn)
    btncontainer.appendChild(deleteBtn)
    
    
    li.appendChild(title)
    li.appendChild(content)
    content.appendChild(btncontainer)

    newEntry.appendChild(li)

    bodyContainer.removeChild(form);
 
}
}


    /*edit new created entry*/
const editNewBtn=document.querySelector('.card');
 
editNewBtn.addEventListener('click', newEditBtn)

function newEditBtn(e) {

    
    const Ntitle= e.target.parentNode.parentNode.parentNode.firstChild;
    const Ncontent= e.target.parentElement.parentNode;
    

   const editBtn = e.target.parentNode.firstChild;

    if( editBtn.textContent ==='EDIT STORY'){


       

        Ntitle.contentEditable = true;
        Ncontent.contentEditable = true;
        Ntitle.focus();
       
        editBtn.textContent =  'SAVE STORY ';

    }
        else{  editBtn.textContent === 'SAVE STORY'

        Ntitle.contentEditable = false;
        Ncontent.contentEditable = false;

}        
}

    /*edit default entry*/

function editDiary(e){
 
        e.preventDefault;
        const title= document.querySelector('.title-diary');
        const content=document.querySelector('.Econtent');

        if(e.target.textContent === 'EDIT STORY'){
      
        e.target.textContent = 'SAVE STORY ';
               
        title.contentEditable = true;
        content.contentEditable = true;
        title.focus();
        }  

    else{
        
      
        e.target.textContent = 'EDIT STORY ';

            title.contentEditable = false;
            content.contentEditable = false;
            
}
}

    /* remove diary*/

function removeDefEntry(e){ 

const deletBtn = document.querySelector('.delete-btn')
const li= e.target.parentElement.parentElement.parentElement;

if(deletBtn){   
      //  popup message
            
    const warnCard= document.createElement('span');
    warnCard.className = 'warn';

    warnCard.appendChild(document.createTextNode('sure you want to delete this entry?'))
 
    const yesNo = document.createElement('div')
    const yesBtn = document.createElement('button')
    const noBtn = document.createElement('button')

    yesNo.className = 'yesNo-btn';
    yesBtn.className = 'yes-btn';
    noBtn.className = 'no-btn';

    yesBtn.appendChild(document.createTextNode('yes'))
    noBtn.appendChild(document.createTextNode('no'))
   
    yesNo.appendChild(yesBtn)
    yesNo.appendChild(noBtn)

    warnCard.appendChild(yesNo)     
    navContainer.appendChild(warnCard)

    newEntry.classList.toggle("show")

    yesNo.addEventListener('click',  (e) => {

        if(e.target.classList.contains('yes-btn')){
        newEntry.removeChild(li)

        warnCard.remove();

        }
        else {
            warnCard.remove();
        }

    })
 }
      
}


newEntry.addEventListener('click', removeNewEntry)

function removeNewEntry(e) {
    if(e.target.textContent === 'DELETE STORY'){


    const warnCard= document.createElement('span');
    warnCard.className = 'warn';
    warnCard.appendChild(document.createTextNode('sure you want to delete this entry?'))
 
    const yesNo = document.createElement('div')
    const yesBtn = document.createElement('button')
    const noBtn = document.createElement('button')

    yesNo.className = 'yesNo-btn'
    yesBtn.className = 'yes-btn';
    noBtn.className = 'no-btn';

    yesBtn.appendChild(document.createTextNode('yes'))
    noBtn.appendChild(document.createTextNode('no'))
   
    yesNo.appendChild(yesBtn)
    yesNo.appendChild(noBtn)

    
    warnCard.appendChild(yesNo)     
    navContainer.appendChild(warnCard)

    newEntry.classList.toggle("show")

    const li= e.target.parentNode.parentNode.parentNode;

    yesNo.addEventListener('click',  (e) => {

        if(e.target.classList.contains('yes-btn')){

        const newEntry = document.querySelector('.card')
        
        newEntry.removeChild(li)

    
        warnCard.remove();

        }  else {
            warnCard.remove();
        }
    })

    }
}
/* Mobile Menu */
const mobileMenuBtn = document.querySelector('.menu__btn');
const mobileMenuWrapper = document.querySelector('.mobile_menu');
const closeMenuBtn = document.querySelector('.menu__close');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuWrapper.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  });
  closeMenuBtn.addEventListener('click', () => {
    mobileMenuWrapper.classList.add('hidden');
    document.body.style.overflow = 'unset';
  });

