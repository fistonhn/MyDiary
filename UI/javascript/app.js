const savebtn=document.querySelector('#diary-btn');
const newEntry=document.querySelector('.card');
const editBtn=document.querySelector('.read-btn');
const form = document.querySelector('.newstory-form');
const bodyContainer = document.querySelector('.dashboard-general');
const addEntry = document.querySelector('.add-entry');
const MyEntryBtn = document.querySelector('#myEntries-btn');
const navContainer = document.querySelector('.container');
const textArea = document.querySelector('.diary__content')
const titleTextArea = document.querySelector('.diary__title')
const deleteBtn = document.querySelector('.delete-btn');
const viewMoreBtn = document.querySelector('.view-more');



MyEntryBtn.addEventListener('click',dashboardBtn)
addEntry.addEventListener('click',addStory);
savebtn.addEventListener('click',saveEntry);



function dashboardBtn(e){
    e.preventDefault;
   
    bodyContainer.removeChild(form);
    bodyContainer.appendChild(newEntry);

               // popup no entry message
        if (newEntry.childElementCount === 0){
               const popup = document.createElement('span');
               popup.className = 'popup-text';
           
               popup.appendChild(document.createTextNode('you have zero entry!'))  
                  
               navContainer.appendChild(popup)
           
               MyEntryBtn.classList.toggle("show")
           
                   setTimeout(() => {
                       navContainer.removeChild(popup);
                        }, 3000);

        }
}


function addStory(e){
    e.preventDefault;
    bodyContainer.appendChild(form);
    bodyContainer.removeChild(newEntry);
    titleTextArea.value='';
    textArea.value='';
    savebtn.textContent = 'SAVE STORY ';

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

    const title=document.createElement('div1')
    const content=document.createElement('div2')
    const pragraph = document.createElement('div');
    const date= document.createElement('div');
    const viewMoreBtn= document.createElement('div');
    const titleContent = document.createElement('div');
    const viewContainer = document.createElement('div');
    
    viewContainer.className = 'info-btn'
    viewMoreBtn.className = 'view-more';
    date.className = 'date';

    viewMoreBtn.appendChild(document.createTextNode('Ready Story'))
    date.appendChild(document.createTextNode( new Date().toLocaleString()));

    viewContainer.appendChild(viewMoreBtn)
    viewContainer.appendChild(date)

    title.className='new-title-diary'
    content.className='new-content-diary'

    
    pragraph.appendChild(document.createTextNode(newContent))
    title.appendChild(document.createTextNode(newTitle))
    content.appendChild(pragraph)

    titleContent.appendChild(title)
    titleContent.appendChild(content)

    
    li.appendChild(titleContent)
    li.appendChild(viewContainer)
    
    
    newEntry.appendChild(li)

    bodyContainer.removeChild(form);


    // ***************************ready more description on new created story *******************************
            
    
    viewMoreBtn.addEventListener('click', (o)=>{
        o.preventDefault;

        // when user immediately click ADD ENTRY button

        addEntry.addEventListener('click',(e)=>{

            e.preventDefault;
            bodyContainer.removeChild(storyContainer)
            // bodyContainer.appendChild(newEntry);
            // newEntry.appendChild(li)

            titleTextArea.value='';
            textArea.value='';
            savebtn.textContent = 'SAVE STORY ';
          

        });

        // when user immediately click MYENTRIES button
        MyEntryBtn.addEventListener('click',(e)=>{
            e.preventDefault;

            bodyContainer.removeChild(storyContainer)
            bodyContainer.appendChild(newEntry);
            newEntry.appendChild(li)
        })

                   // remove li and ul
              
        
                   newEntry.removeChild(li)
                   bodyContainer.removeChild(newEntry);
    
    
                // new bottom for new entry
        const btncontainer=document.createElement('div')
        const newDeleteBtn= document.createElement('span');
        const newEditBtn= document.createElement('span');
        
        btncontainer.className='new-btn'
        newEditBtn.className='editNew'
        newDeleteBtn.className='deleteNew'
    
        newDeleteBtn.appendChild(document.createTextNode('DELETE STORY'))
        newEditBtn.appendChild(document.createTextNode('EDIT STORY'))
    
        btncontainer.appendChild(newEditBtn)
        btncontainer.appendChild(newDeleteBtn)
                
                // create title and description
        
                const head = o.target.parentNode.parentNode.firstChild.firstChild;
               
                const description =o.target.parentNode.parentNode.firstChild.lastChild;
             
                const storyContainer = document.createElement('div')
                const storyTitle = document.createElement('div')
                const storyDesciption = document.createElement('div')
            
                storyContainer.className = 'story-container';
                storyTitle.className = 'story-title';
                storyDesciption.className = 'story-description';
            
                storyTitle.appendChild(document.createTextNode(head.textContent))
                storyDesciption.appendChild(document.createTextNode(description.textContent))
            
                storyContainer.appendChild(storyTitle)
                storyContainer.appendChild(storyDesciption)
                storyContainer.appendChild( btncontainer)
    
                bodyContainer.appendChild(storyContainer);
            
                // edit new created story
              
                newEditBtn.addEventListener('click',(e)=> { 
                    // bodyContainer.removeChild(newEntry);
    
                    e.preventDefault; 
            
                    savebtn.textContent = 'UPDATE STORY ';
                    bodyContainer.appendChild(form);
            
                    titleTextArea.value=storyTitle.textContent
                    textArea.value=storyDesciption.textContent
                           
                    titleTextArea.contentEditable = true;
                    textArea.contentEditable = true;
                    titleTextArea.focus();
            
                    bodyContainer.removeChild(storyContainer);
                    
            
                })
    
               
            /* remove diary*/


        newDeleteBtn.addEventListener('click',(e) =>{

                //  popup warning message
                    
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
    
                
    
                bodyContainer.removeChild(storyContainer);
        
                warnCard.remove();
                
                bodyContainer.appendChild(newEntry);
                
            
    
                //  story successful deleted
    
                const popup = document.createElement('span');
                popup.className = 'popup-text';
                popup.appendChild(document.createTextNode('story successfull deleted!'))  
        
                navContainer.appendChild(popup)
    
            savebtn.classList.toggle("show")
    
            setTimeout(() => {
                navContainer.removeChild(popup);
                }, 3000);
        
                }
                else {
                    warnCard.remove();
                    newEntry.appendChild(li)
                    
                }
            })      
        })  

 

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

