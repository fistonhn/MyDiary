const savebtn=document.querySelector('#diary-btn');
const newEntry=document.querySelector('.card');
const editBtn=document.querySelector('.read-btn');
const form = document.querySelector('.newstory-form');
const bodyContainer = document.querySelector('.general-background');
const addEntry = document.querySelector('.add-entry');
const MyEntryBtn = document.querySelector('#myEntries-btn');
const navContainer = document.querySelector('.nav-container');
const textArea = document.querySelector('.diary__content')


MyEntryBtn.addEventListener('click',dashboardBtn)
addEntry.addEventListener('click',addStory);
editBtn.addEventListener('click',editDiary);
newEntry.addEventListener('click',removeEntry);
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
    li.className= 'container';
 
    // const popup = document.createElement('span')
    // popup.className = 'popup-text'
    // popup.appendChild(document.createTextNode('fill title and body!'))  
    // savebtn.appendChild(popup)

    const newTitle= document.querySelector('.diary__title').value;
    const newContent=document.querySelector('.diary__content').value;
    if(newTitle.length==0 || newContent.length==0){
        alert('fill title and body!')

        // savebtn.classList.toggle("show")
    }
    else{
    const btncontainer=document.createElement('div')
    const title=document.createElement('div1')
    const content=document.createElement('div2')
    const deleteBtn= document.createElement('span');
    const editBtn= document.createElement('span');
    
    btncontainer.className=('new-btn')
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
    li.appendChild(btncontainer)

    newEntry.appendChild(li)

    bodyContainer.removeChild(form);
 
}
}


    /*edit new created entry*/

const editNewBtn=document.querySelector('.card');
 
editNewBtn.addEventListener('click', newEditBtn)

function newEditBtn(e) {

    
    const Ntitle= e.target.parentElement.parentElement.firstChild;
    const Ncontent= e.target.parentElement.parentNode;


   const editBtn = e.target.parentNode.firstChild;

    console.log(editBtn)
    console.log(Ncontent)

    if( editBtn.textContent ==='EDIT STORY'){


        Ntitle.focus();
        Ntitle.blur();
      


        Ntitle.contentEditable = true;
        Ncontent.contentEditable = true;

       
        editBtn.textContent =  'SAVE STORY ';

    }
        else{  editBtn.textContent === 'SAVE STORY'

        Ntitle.contentEditable = false;
        Ncontent.contentEditable = false
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

    function removeEntry(e){ 
    if(e.target.classList.contains('delete-btn')){
        if(confirm('do you want to delete default diary ?')){
                  
            const li= e.target.parentElement.parentElement.parentElement;
            newEntry.removeChild(li)
        
        }
    }
       else if(e.target.classList.contains('deleteNew')){
        if(confirm('do you want to delete this diary ?')){
                  
            const li= e.target.parentElement.parentElement;
            newEntry.removeChild(li)
        
        }
    }
}
