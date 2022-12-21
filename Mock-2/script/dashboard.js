let registered_users = JSON.parse(localStorage.getItem("register-users")) || [];
let Ticket_confirm = JSON.parse(localStorage.getItem("booked")) || [];
let ticketId;


let appendData = (data) => {
  let tableData = document.getElementById("tableData");
  tableData.innerHTML = "";

  data.map((el) => {
    tableData.innerHTML += `<tr>           
        <td>${el.uniqueId}</td>
        <td>${el.name}</td>
        <td>${el.age}</td>
        <td>${el.fromStation}</td>
        <td>${el.ToStation}</td>
        <td>${el.Jdate}</td>   
        <td>${el.seattype}</td>    
        <td><button class="confirmBtn" onclick='getOtp(${el.uniqueId})'>Confirm</button></td>              
        <td><button class="rejectBtn" onclick='deleteFn(${el.uniqueId})'>Rejected</button></td>              
    </tr>`;
  });
};
appendData(registered_users);

let getOtp = (uniqueId) => {
   ticketId = uniqueId;
  let otp = prompt("Please enter OTP for confirm Booking:", "Enter OTP");
  let isValid = registered_users.find(
    (el) => el.uniqueId == ticketId && el.otp == otp
  );
  if (isValid !== undefined) {
    alert(`${isValid.name} Added to Waiting list`);
    setTimeout(() => {
      alert(
        `Booking ticket from  ${isValid.fromStation}  to  ${isValid.ToStation} `
      );
    }, 5000);
    setTimeout(() => {
      alert(`Ticket booked for ${isValid.Jdate}`);
      ConfirmTicFun();
    }, 10000);
  } else {
    alert("wrong OTP");
  }
};

 let ConfirmTicFun = () => {

   let x = registered_users.find((el) => el.uniqueId == ticketId);
   Ticket_confirm.push(x);
      // vaxinated_user.push(x);
   localStorage.setItem("booked", JSON.stringify(Ticket_confirm));
   let y = registered_users.filter((el) => el.uniqueId != ticketId);
   localStorage.setItem("register-users", JSON.stringify(y));
   window.location.reload();
 };


let deleteFn = (id) => {
  let new_data = registered_users.filter((el) => el.uniqueId != id);
  localStorage.setItem("register-users", JSON.stringify(new_data));
  alert("Rejected successfully");
  window.location.reload();
};

const sortByAge = (event) => {
  let sorByAge = event.target.value;
  actualFilter(sorByAge);
};

const filterBySeatType = (event) => {
  let filterBySeat = event.target.value;
   console.log(filterBySeat);
  actualFilter(filterBySeat);
};

const filterByDate = (event) => {
  fBydate = event.target.value;
  actualFilter(fBydate);
};

const actualFilter = (ticket) => {
  let data = registered_users;
  console.log(data);
  if (ticket === "lth") {
    data = data.sort((a, b) => a.age - b.age);
    appendData(data);
  } else if (ticket === "htl") {
    data = data.sort((a, b) => b.age - a.age);
    appendData(data);
  } else if (ticket === "sleeper") {
    data = data.filter((el) => el.seattype == "Sleeper Class");
    appendData(data);
  } else if (ticket === "ACFirstClass") {
    data = data.filter((el) => el.seattype == "ACFirstClass");
    appendData(data);
  } else if (ticket === "secondclass") {
    data = data.filter((el) => el.seattype == "Second Class");
    appendData(data);
  } else if (ticket === "general") {
    data = data.filter((el) => el.seattype == "General");
    appendData(data);
  } else if (ticket === "latest") {
    data = data.sort((a, b) => new Date(a.Jdate) - new Date(b.Jdate));
    //console.log(data.jdate)
    appendData(data);
  } else if (ticket === "old") {
    data = data.sort((a, b) => new Date(b.Jdate) - new Date(a.Jdate));
    appendData(data);
  }
};

