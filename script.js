
const sectionList = document.querySelector(".section-list")
const chapterList = document.querySelector(".button-list")
const listChapter = document.querySelector(".chapter-list")
const titlelist = document.querySelector(".title-list")
const list = document.querySelectorAll(".list")
const nameInput = document.querySelector(".text")
const listdata = document.querySelector(".daylidate")


// NAVIGATION CLASSES
const navigation = document.querySelector(".navigation")
const home = document.querySelector(".home")
const biblia = document.querySelector(".biblia")
const oracao = document.querySelector(".oracao")
const user = document.querySelector(".user")

// PEGANDOS AS PAGINAS

const page1 = document.querySelector(".page1")
const page2 = document.querySelector(".page2")
const page3 = document.querySelector(".page3")
const page4 = document.querySelector(".page4")
const backp3 = document.querySelector(".iconbackp3")
const backp4 = document.querySelector(".iconbackp4")

// SHARE WEB API NATIVE

const buttonShared = document.querySelector(".shared")
const listShare = document.querySelector(".dayliverse")
const listModal = document.querySelector(".contentmodal")
const modalShare = document.querySelector(".modalshare")
const modal = document.querySelector(".modal")



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

// FUNCTION NAVIGATION COM CAPITULOS E VERSES

home.addEventListener("click", (e)=> {
    page1.style.display = "block"
    page2.style.display = "none"
    page3.style.display = "none"
    page4.style.display = "none"

})
biblia.addEventListener("click", (e)=> {
    page1.style.display = "none"
    page2.style.display = "block"
    page3.style.display = "none"
    page4.style.display = "none"

})
backp3.addEventListener("click", (e)=> {
    location.reload()
})
backp4.addEventListener("click", (e)=> {
    location.reload()
})

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
                        button.innerText = `${chapter}`
                        chapterList.append(button)
                        page2.style.display = "none"
                        page3.style.display = "block"
                        navigation.style.display = "none"
                           
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
                            page3.style.display = "none"
                            navigation.style.display = "none"
                            page4.style.display = "block"
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





const url = `http://biblia.marciocosta.eti.br/v1/CaixinhaPromessas`

fetch(url).then(response => {
    response.json().then(data => {
       const {referencia, texto} = data
       const ul = document.createElement('ul')
       ul.innerHTML = `<li class="sharetext">${texto}</li><li class="shareref">${referencia}</li>`
       listShare.append(ul)
       const div = document.createElement('div')
       div.innerHTML = `<li class="sharetext1">${texto}</li><li class="shareref1">${referencia}</li>`
       modal.appendChild(div)
       const shareText = document.querySelector('.sharetext1').innerText
       const shareRef = document.querySelector('.shareref1').innerText
       
    })
})

listdata.innerHTML = `<span>${dia}</span> <span>${month} / </span> <span> ${day}</span>`
  

// const cardnumber = "1234506789797853"
// const last4digits = cardnumber.slice(-4)
// const maskednumber = last4digits.padStart(cardnumber.length, '#')
// console.log(cardnumber.length);
// `https://liturgia.up.railway.app/${dia}-${mes}`
  //'http://biblia.marciocosta.eti.br/v1/CaixinhaPromessas'
//https://github.com/MarcioAndrade/Biblia
//https://github.com/search?q=api+biblia&type=repositories
