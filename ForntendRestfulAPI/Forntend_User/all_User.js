const init = async()=>{
    const allUsers = await fetch(
        "http://localhost:5000/apis/Users",{
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
            },
    }).then((response)=> response.json());
    allUsers.forEach((element) => addUsers(element));
}

const addUsers = (element) =>{
    const item = document.createElement("div"); //สร้าง div
    item.className = "card"; //กำหนดชื่อ class
    item.style ="width: 20rem;" //กำหนด style
    //6-14 เป็นการกำหนด HTML มีการแทรก ข้อมูลลงไปด้วย
    const card =`    
    <img src="${element.imageurl}" class="card-img-top" alt="${element.Firstname}">
    <div class="card-body">
      <h5 class="card-title">${element.Firstname}</h5>
      <p class="card-text">${element.Lastname}</p>
      <p class="card-text">${element.Sex}</p>
      <p class="card-text">${element.Day}</p>
      <p class="card-text">${element.Month}</p>
      <p class="card-text">${element.Year}</p>
      <p class="card-text">${element.PhoneMunber}</p>
      <p class="card-text">${element.Email}</p>
      <p class="card-text">${element.Address}</p>
      <p class="card-text">${element.Province}</p>
      <p class="card-text">${element.District}</p>
      <p class="card-text">${element.postcode}</p>
      <a href="#" class="btn btn-danger" onclick="deleteUser(${element.id})">Delete</a>
      <a href="edit.html?id=${element.id}" class="btn btn-warning">Edit</a>
    </div>
    `;
    item.innerHTML = card;  //เอาไปแทรกที่card ลงใน div
    const userElement = document.querySelector(".users"); //เข้าถึง class หน้า HTML
    userElement.appendChild(item); //เพิ่มลงไป
}

const removeAllResult = () =>{
    const usersElement = document.querySelector(".users");
    usersElement.innerHTML = "";
}

const deleteRestaurant = async (id) =>{ //รับไอดีที่ส่งมา
    if(id){ //เช็ค id
        try{
            const restaurant = await fetch(
                "http://localhost:5000/apis/Users/" + id,{ //ต่อไอดีที่ส่งมาจากการกำปุ่ม Delete 
                method: "DELETE",          //DELETE
                mode:"cors",
                cache:"no-cache",               //6-8 บอกว่า server อยู่ที่เดียวกัน
                credentals:"same-origin",
                headers:{
                    "Content-type":"application/json"  //ข้อมุลอยู่ในรูปแบบ json
                },
            }).then((response)=>{
                return response.json();  //ส่งค่าในรูปแบบ json
            }).then(()=>{
                alert (`Restaurant id:${id} is Delete`); //แสดง alter ว่าลบแล้ว
                location.reload(); //load หน้าใหม่หลัง Delete
            }
            );
        }catch(error){
            alert(`Restaurant id:${id} not found!!`);
        }
    }else{
        alert("Restaurant ID is missing") 
    }
}