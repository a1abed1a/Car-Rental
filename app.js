let customerName = document.getElementById('customerName')
let carModle = document.getElementById('carModle')
let submit = document.getElementById('submit')
let table =document.getElementById('table')
// let image = document.getElementById('image')
// let details = document.getElementById('details')
let orders = [];

getFromLocal ()

function Order(name,modle){
    this.name = name
    this.modle = modle
    this.price = Math.floor(Math.random() * (10000 - 1000) + 1000)
}

Order.prototype.saveToLocal = function (){
    localStorage.setItem('orders',JSON.stringify(orders))
}

document.getElementById('submit').addEventListener("click", function(event){
    event.preventDefault()
    let temOrder = new Order(customerName.value,carModle.value)
    orders.push(temOrder)
    temOrder.saveToLocal();
    renderTable()
})

function renderTable(){
    table.innerHTML = ''

    let trHead = document.createElement('tr')
    let thImage = document.createElement('th')
    let thDetails = document.createElement('th')
    thImage.textContent = 'Order Image'
    thDetails.textContent = 'Order Details'
    table.append(trHead)
    trHead.appendChild(thImage)
    trHead.appendChild(thDetails)


    for(let i = 0; i < orders.length; i++){
        let tr = document.createElement('tr')
        let tdImage = document.createElement('td')
        let img = document.createElement('img')
        img.id = 'carimg'
        let tdDetails = document.createElement('td')

        if(orders[i].modle == 'BMW'){
            img.src = "https://cdn.worldvectorlogo.com/logos/bmw-logo.svg"
        }else if(orders[i].modle == 'KIA'){
            img.src = "https://cdn.icon-icons.com/icons2/2402/PNG/512/kia_logo_icon_145812.png"
        }else{
            img.src = "http://motorplus.net/wp-content/uploads/2017/04/ford-logo.jpg"
        }
        tdImage.appendChild(img)
        tr.appendChild(tdImage)

        tdDetails.textContent = `Modle ${orders[i].modle} Price ${orders[i].price}`
        tr.appendChild(tdDetails)

        table.appendChild(tr)
    }
}

renderTable()

function getFromLocal(){
    if(localStorage.getItem('orders')){
        orders = JSON.parse(localStorage.getItem('orders'))
    }
}