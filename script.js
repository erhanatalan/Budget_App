//!gelir 
const gelirDate = document.getElementById("dateGelir")
const gelirTutar = document.getElementById("gelirTutar")
const gelirTuru = document.getElementById("gelirTuru")
const gelirBtn = document.getElementById("gelirBtn")
//!gider
const giderDate = document.getElementById("dateGider")
const giderTutar = document.getElementById("giderTutar")
const giderTuru = document.getElementById("giderTuru")
const giderBtn = document.getElementById("giderBtn")
//!genelToplam
const toplamGelir = document.getElementById("toplamGelir")
const toplamGider = document.getElementById("toplamGider")
const kasa = document.getElementById("kasa")
//! Islem Noktasi
const ekle = document.querySelector(".tableBody")

let gelirGider = JSON.parse(localStorage.getItem("gelirGider")) || []

window.addEventListener("load", ()=>{
    getAlfromLocale()
    toplam()
})

const getAlfromLocale = ()=>{
    gelirGider.sort((a, b) => b.id-a.id);
    gelirGider.map((el) => {
        if(el.gg=='gelirT'){
            ekle.innerHTML += `
            <tr class="table-success border-dark" id=${el.id}>
                <td>${el.tarih}</td>
                <td>${el.tur}</td>
                <td class="gelirT">${el.tutar}</td>
                <td><i class="fa-solid fa-trash-can"></i></td>
            </tr>
        `
        }else if(el.gg=='giderT'){
            ekle.innerHTML += `
            <tr class="table-danger border-dark" id=${el.id}>
                <td>${el.tarih}</td>
                <td>${el.tur}</td>
                <td class="gelirT">${el.tutar}</td>
                <td><i class="fa-solid fa-trash-can"></i></td>
            </tr>
        `
        }
    });
}

function AddObje(id, gg, tarih, tur, tutar, acik) {
    this.id = id;
    this.gg = gg;
    this.tarih = tarih;
    this.tur = tur;
    this.tutar = tutar;
    this.acik = acik;
    this.html = function(){
        return `
        <tr class="${this.acik} border-dark" id=${this.id}>g
            <td>${this.tarih.split("T").join(" ")}</td>
            <td>${this.tur}</td>
            <td class="${this.gg}">${this.tutar}</td>
            <td><i class="fa-solid fa-trash-can"></i></td>
        </tr>
    `}
}


gelirBtn.addEventListener("click", (e)=>{
    e.preventDefault()
    gelirEkle()
    toplam()
    e.target.closest("form").reset()
})
giderBtn.addEventListener("click", (e)=>{
    e.preventDefault()
    giderEkle()
    toplam()
    e.target.closest("form").reset()
})

const gelirEkle = () =>{
    const newGelir = new AddObje( `${new Date().getTime()}`, 'gelirT' ,`${gelirDate.value.split("T").join(" ")}`,`${gelirTuru.value}`,`${gelirTutar.value}`,'table-success')
        
    gelirGider.push(newGelir)
    localStorage.setItem("gelirGider",JSON.stringify(gelirGider));
    ekle.innerHTML += newGelir.html()
    window.location.reload()
}
const giderEkle = () =>{
    const newGider = new AddObje( `${new Date().getTime()}`, 'giderT' ,`${giderDate.value.split("T").join(" ")}`,`${giderTuru.value}`,`${giderTutar.value}`,'table-danger')
        
    gelirGider.push(newGider)
    localStorage.setItem("gelirGider",JSON.stringify(gelirGider));
    ekle.innerHTML += newGider.html()
    window.location.reload()
}

const toplam = () =>{
    let gelirToplam = 0
    gelirGider.forEach((a)=>{
        if(a.gg == "gelirT"){
            gelirToplam += Number(a.tutar)
        }
    })
    toplamGelir.innerText = gelirToplam
    ///////////////////////////////////
    let giderToplam = 0
    gelirGider.forEach((a)=>{
        if(a.gg == "giderT"){
            giderToplam += Number(a.tutar)
        }
    })
    toplamGider.innerText = giderToplam
    ///////////////////////////////////
    let kasat = gelirToplam - giderToplam
    kasa.innerText = kasat
}

ekle.addEventListener("click", (e)=>{
    const idAttr = e.target.closest("tr").getAttribute('id');
    console.log(idAttr);
    if(e.target.classList.contains("fa-trash-can")){
        if(confirm(`Listeden Kaldırmayı Onaylıyor musunuz?`)){
            e.target.closest("tr").remove()
            gelirGider = gelirGider.filter((x) => x.id != idAttr)
            localStorage.setItem("gelirGider", JSON.stringify(gelirGider))
        }
    }
})











