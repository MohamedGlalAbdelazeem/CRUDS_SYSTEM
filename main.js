let title = document.getElementById('title');


let Price = document.getElementById('Price');
let Taxes = document.getElementById('Taxes');
let advertisements = document.getElementById('advertisements');
let discount = document.getElementById('discount');
let total = document.getElementById('total');

let category = document.getElementById('category');
let count = document.getElementById('count');
let Creat = document.getElementById('Creat');
let search = document.getElementById('search');
let searchTitle = document.getElementById('searchTitle');
let SearchCategory = document.getElementById('SearchCategory');


let temporaryVariable;
let programStatuse = "create"
 




// validation 
function getTotal() {
    if (Price.value < 0 ||Taxes.value< 0 ||advertisements.value < 0 || discount.value <0) {
        alert("❌رجاء إدخال قيمة صالحة")
    } else {
        let sum = (+Price.value + +Taxes.value + +advertisements.value) - +discount.value
        total.innerHTML =`إجمالي:${sum}`;
        total.style.backgroundColor='green'
        total.style.paddingLeft='5px'
        total.style.boxShadow=' 0 0 2rem green'
    }     
}


// check if localstorage is empty or not 
let dataProduct;
if (localStorage.getItem('myproduct') != null) {
    dataProduct=JSON.parse(localStorage.getItem('myproduct'));
}else{
    dataProduct = [];
}
 
//-----creat elements and save localstorage------------
Creat.addEventListener('click', function (event) {
    event.preventDefault();
  
    let titleValue = title.value.toLowerCase();
    let priceValue = Price.value;
    let categoryValue = category.value.toLowerCase();
  
    if (titleValue.trim() === '' || priceValue.trim() === '' || categoryValue.trim() === '') {
      alert('من فضلك أدخل البيانات');
    } else {
      let product = {
        title: titleValue,
        Price: priceValue,
        Taxes: Taxes.value,
        advertisements: advertisements.value,
        discount: discount.value,
        total: total.innerHTML,
        category: categoryValue,
        count: count.value,
      }
  
      if (programStatuse === "create") {
        if (product.count > 1) {
          for (let i = 0; i < product.count; i++) {
            dataProduct.push(product);
          }
        } else {
          dataProduct.push(product);
        }
      } else {
        dataProduct[temporaryVariable] = product;
        programStatuse = "create";
        count.style.display = "block";
        Creat.innerHTML = "إنشاء";
      }
  
      localStorage.setItem("myproduct", JSON.stringify(dataProduct));
      getTotal();
      displayData();
      clearData();
    }
  });
  
// clear data form inputs 
function clearData() {
    title.value ="";
    Price.value ="";
    Taxes.value ="";
    advertisements.value ="";
    discount.value ="";
    total.innerHTML ="";
    category.value ="";
    count.value ="";
}

//Read your data 
var tbody = document.getElementById('tbody');
function displayData() {
    let table = ''
    for (let i = 0; i <  dataProduct.length; i++) {
        table +=`
        <tr>
        <td>${i+1}</td>
        <td>${dataProduct[i].title}</td>
        <td>${dataProduct[i].Price}</td>
        <td>${dataProduct[i].Taxes}</td>
        <td>${dataProduct[i].advertisements}</td>
        <td>${dataProduct[i].discount}</td>
        <td>${dataProduct[i].category}</td>
        <td>${dataProduct[i].count}</td>
        <td>${dataProduct[i].total}</td>
        <td><button onclick="updataData(${i})" id="update">تحديث</button></td>
        <td><button onclick="deletElement(${i})" id="delete">حذف</button></td>
    </tr> ` 
    }
    tbody.innerHTML =table; 
    let deletallbtn =document.getElementById('deletBTN');
        if (dataProduct.length > 0) {
            deletallbtn.innerHTML =`<button onclick="deleteAll()">حذف الكل (${dataProduct.length})</button>` 
        }else{
            deletallbtn.innerHTML = '';
        }
        total.style.backgroundColor='red'    
}
 

// delete element only 
function deletElement(i) {
   dataProduct.splice(i,1);
   localStorage.product=JSON.stringify(dataProduct);
   displayData();
}


//delete all 
function deleteAll( ) {
    localStorage.clear();  
}

window.onload =function(){
    displayData();
}

//update data
function updataData(i){
    title.value = dataProduct[i].title;
    Price.value = dataProduct[i].Price;
    Taxes.value = dataProduct[i].Taxes;
    advertisements.value = dataProduct[i].advertisements;
    discount.value = dataProduct[i].discount;
    category.value = dataProduct[i].category;
    count.style.display="none";
    Creat.innerHTML = "تحديث";
    programStatuse ="update";
    temporaryVariable = i;
    scroll({
        top:0,
        behavior:"smooth",
    })
    getTotal();
}



// search 
let searchStatus = 'title';
let searchBar = document.getElementById('search')
function getSearchStatus(id, event) {
    if (id === 'searchTitle') {
        searchStatus = 'title';
       searchBar.placeholder ="إبحث عن طريق اسم المنتج "
    } else {
        searchStatus = 'category';
        searchBar.placeholder="إبحث عن طريق الفئة"
    }
    searchBar.focus();
    event.preventDefault(); 
    searchBar.value='';
    displayData();
}


//search in my data by title or category 
function searchData(Value) {
    let table ='';  
    for (let i = 0; i < dataProduct.length; i++) {
    if ( searchStatus == 'title') { 
            if (dataProduct[i].title.toLowerCase().includes(Value.toLowerCase())) {
                table +=`
                <tr>
                <td>${i}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].Price}</td>
                <td>${dataProduct[i].Taxes}</td>
                <td>${dataProduct[i].advertisements}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].category}</td>
                <td>${dataProduct[i].count}</td>
                <td>${dataProduct[i].total}</td>
                <td><button onclick="updataData(${i})" id="update">تحديث</button></td>
                <td><button onclick="deletElement(${i})" id="delete">حذف</button></td>
            </tr> ` 
            } 
    }else{
            if (dataProduct[i].category.includes(Value.toLowerCase())) {
                table +=`
                <tr>
                <td>${i}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].Price}</td>
                <td>${dataProduct[i].Taxes}</td>
                <td>${dataProduct[i].advertisements}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].category}</td>
                <td>${dataProduct[i].count}</td>
                <td>${dataProduct[i].total}</td>
                <td><button onclick="updataData(${i})" id="update">تحديث</button></td>
                <td><button onclick="deletElement(${i})" id="delete">حذف</button></td>
            </tr>`  
            }
        }
    }
    tbody.innerHTML =table;  
}