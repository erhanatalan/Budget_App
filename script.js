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
    gelirGider.forEach((el) => {
        if(el.gg=='gelirT'){
            ekle.innerHTML += `
            <tr class="table-success" id=${el.id}>
                <td>${el.tarih}</td>
                <td>${el.tur}</td>
                <td class="gelirT">${el.tutar}</td>
                <td><i class="fa-solid fa-trash-can"></i></td>
            </tr>
        `
        }else if(el.gg=='giderT'){
            ekle.innerHTML += `
            <tr class="table-danger" id=${el.id}>
                <td>${el.tarih}</td>
                <td>${el.tur}</td>
                <td class="gelirT">${el.tutar}</td>
                <td><i class="fa-solid fa-trash-can"></i></td>
            </tr>
        `
        }
    });
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
    const newGelir = {
        id: new Date().getTime(),
        gg : `gelirT`,
        deleted : false,
        tarih: `${gelirDate.value.split("T").join(" ")}`,
        tur: `${gelirTuru.value}`,
        tutar: `${gelirTutar.value}`
    }
    gelirGider.push(newGelir)
    localStorage.setItem("gelirGider",JSON.stringify(gelirGider));
    ekle.innerHTML += `
        <tr class="table-success" id=${newGelir.id}>
            <td>${gelirDate.value.split("T").join(" ")}</td>
            <td>${gelirTuru.value}</td>
            <td class="${newGelir.gg}">${gelirTutar.value}</td>
            <td><i class="fa-solid fa-trash-can"></i></td>
        </tr>
    `
}
const giderEkle = () =>{
    const newGider = {
        id: new Date().getTime(),
        gg : `giderT`,
        deleted : false,
        tarih: `${giderDate.value.split("T").join(" ")}`,
        tur: `${giderTuru.value}`,
        tutar: `${giderTutar.value}`
    }
    gelirGider.push(newGider)
    localStorage.setItem("gelirGider", JSON.stringify(gelirGider));

    ekle.innerHTML += `
    <tr class="table-danger" id=${newGider.id}>
        <td>${giderDate.value.split("T").join(" ")}</td>
        <td>${giderTuru.value}</td>
        <td class="${newGider.gg}">${giderTutar.value}</td>
        <td><i class="fa-solid fa-trash-can"></i></td>
    </tr>
    `
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











