let word = document.getElementById("word")
let res = document.getElementById("resBox")
let search = document.getElementById("button")
let wrdtxt = document.getElementById("wordtext")
let pofs = document.getElementById("pos")
let phontxt = document.getElementById("phoneticText")
let btn = document.getElementById("soundbtn")
let deftxt = document.getElementById("def")
let eg = document.getElementById("eg") 
let err = document.getElementById("err")
let part = document.querySelector("sub-part")
let audio = new Audio()

search.addEventListener("click", async function(){
    let typedword = word.value.trim()
    
    if(typedword == ""){
        res.style.display = "none"
        err.textContent = "enter word"
        return
    }
    
    try{
        err.textContent=""
        let research = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${typedword}`)
        let data = await research.json()
        if(data.title){
            err.textContent=`Defination is not found `
            res.style.display = "none"
            return
        }
        res.style.display = "block"
        let searchWord =  data[0]
        
        wrdtxt.textContent = `${searchWord.word}`
        let phoneticText=""
        let audosrc = ""
        //checking for audio
        for (const phonetic of searchWord.phonetics){
            if(phonetic.text && !phoneticText){
                phoneticText=phonetic.text
            }
            if(phonetic.audio && !audosrc){
                audosrc=phonetic.audio
                
            }
            if(phonetic.text && audosrc){
                break
            }
            

        }
        phontxt.textContent=`${phoneticText}`
        //pos
        let pos = searchWord.meanings[0]
        pofs.textContent =`${pos.partOfSpeech}`
        //
        //defination part
        let def = searchWord.meanings[0].definitions[0]
        deftxt.textContent = `Defination:${def.definition}`

        //example
        if(def.example){
            eg.textContent =`example:${def.example}`
        }
        else{
            document.getElementById("eg-head").textContent="No Example";
        }

        audio.src=audosrc
        soundbtn.addEventListener("click",() =>{audio.play()})
       
        
    }
    catch(error){
        console.log(error)
    }
        
    

})
