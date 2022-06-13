function textempty() {
    console.log("text area is empty");
};
showNotes();

document.getElementById("newtext").addEventListener("keypress",function(e){
    if(e.key==="Enter")
    {
        let temptext = document.getElementById("newtext");
        let notes = localStorage.getItem("notes");
        if(temptext.value==""){
            e.preventDefault();
            textempty();
        }
        else{
            e.preventDefault();
            if (notes == null) 
            {
                notesObj = [];
            } 
            else {
                notesObj = JSON.parse(notes);
            }
            notesObj.push(temptext.value);
            localStorage.setItem("notes", JSON.stringify(notesObj));
            document.getElementById("newtext").value = null;
            console.log("one note added");
            showNotes();
        }
        
    }
    
});
document.getElementById("addbtn").addEventListener("click", function () {
    let temptext = document.getElementById("newtext");
    let notes = localStorage.getItem("notes");
    if(temptext.value==""){
        textempty();
    }
    else{

        if (notes == null) 
        {
            notesObj = [];
        } 
        else {
            notesObj = JSON.parse(notes);
        }
        notesObj.push(temptext.value);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        document.getElementById("newtext").value = null;
        console.log("one note added")
        showNotes();
    }
});
function showNotes() 
{
    
    let notes = localStorage.getItem("notes");
    if (notes == null) 
    {
        notesObj = [];
    }
    else 
    {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `<div id="${index+1}"class="mynote">${element}
                <div id="${index}" class="delete" onclick="deleteNote(this.id)">DELETE</div>
            </div>`;
    });
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerText = `no notes available right now\n
                            use add notes to add new one`;
    }
};
function deleteNote(index) 
{
       console.log("one note deleted");
      let notes = localStorage.getItem("notes");
      if (notes == null) {
        notesObj = [];
      } 
      else 
      {
        notesObj = JSON.parse(notes);
      }
      notesObj.splice(index, 1);
      localStorage.setItem("notes", JSON.stringify(notesObj));
      showNotes();
};

let search = document.getElementById('search');
search.addEventListener("input", function()
{
    let inputtext = search.value.toLowerCase();
    let mynotes = document.getElementsByClassName('mynote');

    Array.from(mynotes).forEach(function(element){
        let notetemptext = element.innerText;
        if(notetemptext.includes(inputtext)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    }
    )
})