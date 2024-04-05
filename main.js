let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let mood = 'creat';// for chang mood between creat and update
let temp;//ده متغير جلوبال هنستخدمه في الاماكن الي متغير الاي مش متشاف فيها

// get total

function getTotal() {
    if (price.value != '') {
      let result = (+price.value + +taxes.value + +ads.value )- +discount.value;
      total.innerHTML= result
      total.style.background = "#040";
    } else {
        total.innerHTML = '';
        total.style.background = "#c6450d"
    }
}



// creat new product


/*قبل متتعامل مع اي بينات لازم تعرف انتا هتحفظها فين واسهل طريقه لحفظ البينات هيا الاراي
لانك لو عملت اوبجكت وحفظت فيها البينات اول متعمل اضافه لاوبجكت جديد القديم هيتسمح لكن الاراي هتحفظ البينات ومش هتتحذف مع انشاء بينات جديده
ومينفعش تحط البينات في اراي علي طول عشان لو عملت كدا البينات هتتلغبط ومش هتبقا موحده مع بعضعشان كده بنحطها في اوبجت وبعدين بنحط الاوبجكت في الاراي
وبعد منحفظها في اراي عشان متتمسحش لما نعمل اعاده تحميل للصفحه لازم نسنتخدم التخزين المحلي
*/ 
// الاراي الي هيتحفظ فيه الاوبجت الي فيه البينات
let proData =[];
/* هنا قمنا باخبار الكود اذا كان التخزين المحلي فيه بينات فاجعل الاراي يساوي هذه البينات 
وهذا بسبب ان الكود يعمل من اعل لاسفل وبناء عليه عند عمل اعاده تحميل للصفحه فان الكود 
يقرء الاراي وهو فارغ قبل كود انشاء الاوبجكت والتخزين المحلي الذي يليه فيعتقد الكود ان الاراي فارغ فيقوم بانشاء بينات جديده وحذف القديمه 
 */
 if (localStorage.product != null) {
    proData=JSON.parse(localStorage.product)
} else{
    proData =[]
};
 

submit.onclick= function () {
    // الاوبجت الي هيتحبظ فيه البينات
    let newPro ={
        title:title.value.toLowerCase() ,
        price:price.value,
        taxes:taxes.value ,
        ads: ads.value,
        discount:discount.value,
        total:total.innerHTML ,
        count:count.value,
        category:category.value.toLowerCase(),
    }
// creat count
//لو العدد الي جوا الاوبجكت اكبر من واحد اعمل لوب علي بوش الاراي  بعدد المكتوب في العدد ولو غير ذالك اعمل بوش مره واحده د
    if (title.value != ""&& price.value!= "") {//اذا كان العنون فاضي والسعر فارغ لان يتم انشاء منتج
            if (mood === 'creat') {
                if (newPro.count >1 ) {
                    for (let i = 0; i < newPro.count ; i++) {
                        proData.push(newPro); //اضافه الاوبجكت لاخر الاراي  
                    }
                } else {
                    proData.push(newPro); 
                }
            }else {
                proData[ temp ]= newPro ;
                mood='creat';
                submit.innerHTML='creat';
                count.style.display='block'
            }
        cleardata()
    }    

// sava localstorage
    localStorage.setItem ('product', JSON.stringify (proData)) //وضعنا الاراي داخل التخزين المحلي حتي لا تمسح البينات بعد اعاده تحميل الصفحه مه تحويله الي سترينج

    showdata()
}

// clear inputs after creat
//مسح البينات بعد الضغط علي زر انشاء
function cleardata() {
    title.value ='';
    price.value ='';
    taxes.value ='';
    ads.value ='';
    discount.value ='';
    total.innerHTML ='';
    count.value ='';
    category.value ='';

}
// read

function showdata() {
    let table = '';
    for (let i = 0; i < proData.length; i++) {
        //كتبنا الي هيبقا جوا التايبل الي جو الاتش تي ام ال ولكن مع تحديدالبينات الخاصه بكل خليه من الاراي
        table +=`
        <tr>
            <td>${i+1}</td>,
            <td>${proData[i].title}</td>
            <td>${proData[i].price}</td>
            <td>${proData[i].taxes}</td>
            <td>${proData[i].ads}</td>
            <td>${proData[i].discount}</td>
            <td>${proData[i].total}</td>
            <td>${proData[i].category}</td>
            <td><button onClick="updatedata(${i})" id="update">update</button></td>
            <td><button onClick="deletedata(${i})" id="delete">delete</button></td>
        </tr>`
    }
    document.getElementById('tbody').innerHTML= table;
    let btnDeleteAll = document.getElementById('deleteall');
    if (proData.length >0) {
        btnDeleteAll.innerHTML=`
        <button onclick='deletall()'> delete All (${proData.length}) </button>
        `
    } else {
        btnDeleteAll.innerHTML=''        
    }
    getTotal()
}
showdata()


// delet


function deletedata(i) {
    proData.splice(i,1);//لمسح العنصر من الاراي
    localStorage.product= JSON.stringify(proData);//عشان الاراي والتخزين المحلي موصلين علي بعض لازم نمسح من الاتنين ، بعد ممسحنا من الاراي جينا هنا وقولنا للتخزين المحلي يجيب البينات الي موجوده في الاراي ،تحديث بينات
    showdata() //بعد مبنمسح النتيجيه مبتبنش للمستخدم الا لو عمل ريلود للصفحه احنا هنا خلينا كل ميمسح يشغل الفانكشن السؤوله عن عرض الداتا في الصفحه للمستخدم ،،،اعاده تشغيل
}
//delete All
function deletall() {
    localStorage.clear()//حذف كل البينات من التخزين المحلي دفعه واحده
    proData.splice(0);//الصفر  يعني كل الانديكس الموجوده  في الاراي لحذف كل عناصر الاراي
    showdata()//تحديث التايبل الذي يعرض البينات لعدم الاضترار لاعاده تحميل الصفحه
}
// update


function updatedata(i) {
  title.value = proData[i].title;
  price.value = proData[i].price;
  taxes.value = proData[i].taxes;
  ads.value = proData[i].ads;
  discount.value = proData[i].discount;
  getTotal();
  category.value = proData[i].category;
  count.style.display='none';
  submit.innerHTML='Update';
  mood='update';
  temp= i;
  scroll({
    top :0,
    behavior:"smooth"
  })

}
// search


let searchmood = 'title';

function getsearchmood(id) 
{
    let search= document.getElementById('serch')
    if (id =='serchtitle') {
         searchmood = 'title';
         search.placeholder ='searh by title';
    } else {
         searchmood = 'category';
         search.placeholder ='searh by category';
    }
    search.focus()
    console.log()
}

function searchData(value) {
    table = "";
    if (searchmood== 'title') {
        for (let i = 0; i < proData.length; i++) {
            if (proData[i].title.includes(value.toLowerCase())) {
                table +=  `
                <tr>
                    <td>${i}</td>,
                    <td>${proData[i].title}</td>
                    <td>${proData[i].price}</td>
                    <td>${proData[i].taxes}</td>
                    <td>${proData[i].ads}</td>
                    <td>${proData[i].discount}</td>
                    <td>${proData[i].total}</td>
                    <td>${proData[i].category}</td>
                    <td><button onClick="updatedata(${i})" id="update">update</button></td>
                    <td><button onClick="deletedata(${i})" id="delete">delete</button></td>
                </tr>`
            }
        }
    }else{
        for (let i = 0; i < proData.length; i++) {
            if (proData[i].category.includes(value.toLowerCase())) {
                table +=  `
                <tr>
                    <td>${i}</td>,
                    <td>${proData[i].title}</td>
                    <td>${proData[i].price}</td>
                    <td>${proData[i].taxes}</td>
                    <td>${proData[i].ads}</td>
                    <td>${proData[i].discount}</td>
                    <td>${proData[i].total}</td>
                    <td>${proData[i].category}</td>
                    <td><button onClick="updatedata(${i})" id="update">update</button></td>
                    <td><button onClick="deletedata(${i})" id="delete">delete</button></td>
                </tr>`
            }
        }
    }
    document.getElementById('tbody').innerHTML= table;
}


// clean data
