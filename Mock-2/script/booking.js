let registered_users = JSON.parse(localStorage.getItem("booked")) || [];

console.log("data",registered_users)
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
        
    </tr>`;
  });
};
appendData(registered_users);

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

