
const sectionList = document.querySelector(".section-list")
const chapterList = document.querySelector(".button-list")
const listChapter = document.querySelector(".chapter-list")
const titlelist = document.querySelector(".title-list")
const list = document.querySelectorAll(".list")
const nameInput = document.querySelector(".text")
const listdata = document.querySelector(".daylidate")



// SALVANDO NOME DO USUARIO NO LOCALSTORAGE
const username = localStorage.getItem("username") || ''
nameInput.value = username

nameInput.addEventListener("change", (e) =>{
    localStorage.setItem("username", e.target.value)
})




// SCRIPT DO NAVIGATION MENU

function activelink(){
    list.forEach((item)=>
        item.classList.remove("active")
        )
        this.classList.add('active')
}
list.forEach((item)=>
    item.addEventListener("click", activelink))


const verseBible = ()=> {
    fetch('verse.json').then(response => {
        response.json().then(data => {
            data.map((verse) => console.log(verse))})
    });
}


fetch("book.json").then(response => {
    response.json().then(data => {
        const bookname = data.map((book) => {
            const {name, book_reference_id } = book
            const button = document.createElement("button")
            button.classList.add("list-group-item")
            button.dataset.value = book_reference_id
            button.textContent = name
            sectionList.append(button)
                


        });
        
        const buttons = document.querySelectorAll("button")
        const book = (btnbook)=> {
            fetch('verse.json').then(response => {
                response.json().then(data => {
                    const filterverse = data.filter((versiculo) => versiculo.book_id == btnbook)
                    const chaptersbuttons = filterverse.filter(chapter => chapter.verse == 1)
                    chaptersbuttons.map(listchapter => {
                        const {chapter} = listchapter
                        const button = document.createElement("button")
                        button.classList.add("list-group-btn")
                        button.dataset.value = chapter
                        button.innerText = `Capitulo: ${chapter}`
                        chapterList.append(button)
                           
                    })
                    const btnbutton = document.querySelectorAll("button")
                        btnbutton.forEach((button) => {
                            button.addEventListener("click", (e) => buttonchapter(e.target.dataset.value))
                        })  
                    const buttonchapter = (btnchapter)=> {
                        fetch("book.json").then(response=> {
                            response.json().then(data=> {
                                const listname = data.filter(item=> item.book_reference_id == btnbook)
                                listname.map(item=> {
                                    const {name} = item
                                    const h1 = document.createElement("span")
                                    h1.innerText = name
                                    h1.classList.add("title")
                                    titlelist.prepend(h1)
                                })
                            })
                        })
                        const showchapter = chaptersbuttons.filter(item=> item.chapter == btnchapter )
                        showchapter.map(item=> {
                            const {chapter} = item
                            const h2 = document.createElement("span")
                            h2.innerText = `:${chapter}`
                            titlelist.append(h2)
                        })
                        const filterteste = filterverse.filter(capit => capit.chapter == btnchapter)
                        console.log(filterteste);
                        filterteste.map(item=> {
                            const {verse, text} = item
                            const li = document.createElement("li")
                            li.classList.add("list-item")
                            li.innerHTML = `<span classe="number-verse"> ${verse}</span> 
                                <span classe="text-verse"> ${text}</span>`
                            listChapter.append(li)
                        })
                        

                    }
                    
                    
                })
            });
        }

        buttons.forEach((button) => {
            button.addEventListener("click", (e) => book(e.target.dataset.value))
        })
        

    });
})
// COLOCANDO DATA NA TELA







// const buttonchapter = (btnchapter)=> {
    

// }

// api com liturgias diarias para projeto biblia

// https://liturgia.up.railway.app/19-06
// https://liturgia.up.railway.app/${dia}-${mes}

const data = new Date()

console.log(data);

const dia = String(data.getDate()).padStart(2, '0')
const mes = String(data.getMonth()+1).padStart(2, '0')

const options = { month: 'long',}
const month = Intl.DateTimeFormat('pt-BR', options).format(data)
const day = Intl.DateTimeFormat('pt-BR', {weekday: 'long'}).format(data)





const url = `https://liturgia.up.railway.app/${dia}-${mes}`

fetch(url).then(response => {
    response.json().then(data => {
       console.log(data);
    })
})

listdata.innerHTML = `<span>${dia}</span> <span>${month} / </span> <span> ${day}</span>`
  

const cardnumber = "1234506789797853"
const last4digits = cardnumber.slice(-4)
const maskednumber = last4digits.padStart(cardnumber.length, '#')
console.log(cardnumber.length);
  

