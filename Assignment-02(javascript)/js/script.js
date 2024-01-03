

// fetch catagoris
function loadCat(isTrue) {
    fetch('https://openapi.programming-hero.com/api/videos/categories')
        .then(res => res.json())
        .then(js => showedCate(js , isTrue))
         
}

// show catagories

function showedCate(js,isTrue) {
    
    let CategoriEs = document.getElementById("Category")
    CategoriEs.innerHTML = ``;

    js.data.forEach(element => {
        
        let categorybtn = document.createElement("button")
        categorybtn.classList = "btn "

        if(isTrue == true) {

            categorybtn.setAttribute("onclick", `loadData(${element.category_id} ,${true})`)
        }
        else{
            categorybtn.setAttribute("onclick", `loadData(${element.category_id})`)
            
        }

        categorybtn.setAttribute("id", `${element.category_id || 1000}`)

        categorybtn.innerText = `${element.category}`

        CategoriEs.appendChild(categorybtn)

        categorybtn.addEventListener("click" , function(){

            js.data.forEach(element => {

                document.getElementById(element.category_id).classList.remove("active")
                
            }); 

            categorybtn.classList.add('active')
        })

        if (element.category_id == 1000){

            categorybtn.classList.add('active')
        }
        
    });
}

function shotByView(){
    loadCat(true)
    loadData(1000 , true)

}
// load  videos


function loadData(element,isTrue) {    

    fetch(`https://openapi.programming-hero.com/api/videos/category/${element}`)
        .then(res => res.json())
        .then(js => showData(js , isTrue))        

}
function kToNum(strg){
    if (strg.includes("K")) {
        let st2 = strg.replace("K", "")
        return st2 *1000;
    }
    else {

        return strg;
    }
}
// function for showing videos

function showData(js ,isTrue) {

    if(isTrue == true){

        js.data.sort((a,b) => kToNum(b.others.views) - kToNum(a.others.views))
    }
    


    let Cardcontainer = document.getElementById("cardcontianer")
    Cardcontainer.innerHTML = ``

    // tab e kono video na thakle
    if (js.data.length == 0) {
        Cardcontainer.classList = ''
        Cardcontainer.innerHTML = `
        
        <div class="h-screen text-3xl  flex justify-center flex-col space-y-4 items-center max-h-[450px]">
            <img src="../images/Icon.png" alt="../images/Icon.png">
            <p class="text-center">Ooops!!! Sorry ,There is no content here</p>

        </div>
        
        `
    }
    //atleast akta video jate tab e thake
    else {
        Cardcontainer.classList = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'
        
        js.data.forEach(element => {
    
            let card = document.createElement("div")
            card.classList = "card  bg-base-100  -z-50"

            card.innerHTML = `
                    <div class="relative">
                        <figure class="rounded-lg h-44 md:h-auto  ">
                            <img class = " w-full h-full  md:h-44" src="${element.thumbnail}" alt="Shoes" />
                            <span id="${element.others.views}"  class=" bg-black text-white p-2 absolute right-1 bottom-3 rounded-md ">${secToHour(element.others.posted_date) + "ago"} </span>
                            </figure>  
                    </div>          
            
                    <div class="card-body flex flex-row">
                    
                        <div class="shrink-0">
                            <img class="rounded-full w-10 h-10" src="${element.authors[0].profile_picture}" alt="">
                        </div>
                        <div class="space-y-2 text-gray-700">
                            <h2 class="card-title">${element.title}</h2>
                            <p >${element.authors[0].profile_name} <span>${element.authors[0].verified ? "<img class='w-5 h-5 inline' src='../images/Twitter_Verified_Badge.svg.png' alt=''></img>" : ''}
                                </span></p>
                            <p>${element.others.views} views</p>
    
                        </div>
                    </div>
            
            `
    
            Cardcontainer.appendChild(card)

            // time available na hole display korbena

            if(element.others.posted_date == ""){
                
                document.getElementById(element.others.views).style.display ="none"
                
            }
        });
        
    }

}




loadData(1000)
loadCat()

