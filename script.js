
const sectionList = document.querySelector(".section-list")
const chapterList = document.querySelector(".button-list")
const listChapter = document.querySelector(".chapter-list")
const titlelist = document.querySelector(".title-list")


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



// const buttonchapter = (btnchapter)=> {
    

// }

// api com liturgias diarias para projeto biblia

// https://liturgia.up.railway.app/19-06
// https://liturgia.up.railway.app/${dia}-${mes}
  

