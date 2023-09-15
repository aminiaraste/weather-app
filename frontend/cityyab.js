// import { Chart } from "./chart.js";
/*let weather = {
    paris: {
      temp: 19.7,
      humidity: 80
    },
    tokyo: {
      temp: 17.3,
      humidity: 50
    },
    lisbon: {
      temp: 30.2,
      humidity: 20
    },
    san_francisco: {
      temp: 20.9,
      humidity: 100
    },
    oslo: {
      temp: -5,
      humidity: 20
    }
  };
  // write your code here
    function ract() {
        const val = document.querySelector('input').value;
        console.log(val);
        if (val=="paris") {
            temp_P =Math.round(weather.paris.temp)
            faren= (((weather.paris.temp)*1.8)+32)
            faren = Math.floor(faren)
            alert(`It is currently ${temp_P} °C (${faren}°F) in paris with a humidity of ${weather.paris.humidity}%`)
        }
        else if(val =="tokyo"){
            faren= (((weather.tokyo.temp)*1.8)+32)
            faren = Math.floor(faren)
            temp_t =Math.round(weather.tokyo.temp)
            alert(`It is currently ${temp_t} °C (${faren}°F) in paris with a humidity of ${weather.tokyo.humidity}%`)
        }
        if(val =="lisbon"){
            faren= (((weather.lisbon.temp)*1.8)+32)
            faren = Math.floor(faren)
            temp_l =Math.round(weather.lisbon.temp)
            alert(`It is currently ${temp_l} °C (${faren}°F) in paris with a humidity of ${weather.lisbon.humidity}%`)
        }
        if(val =="san_francisco"){
            faren= (((weather.san_francisco.temp)*1.8)+32)
            faren = Math.floor(faren)
            temp_s =Math.round(weather.san_francisco.temp)
            alert(`It is currently ${temp_s} °C (${faren}°F) in paris with a humidity of ${weather.san_francisco.humidity}%`)
        }
        if(val =="oslo"){
            faren= (((weather.oslo.temp)*1.8)+32)
            faren = Math.floor(faren)
            temp_o =Math.round(weather.oslo.temp)
            alert(`It is currently ${temp_o} °C (${faren}°F) in paris with a humidity of ${weather.oslo.humidity}%`)
        }
        else{
            alert("Sorry we don't know the weather for this city")
        }
  }
  let stm = document.getElementById("suc")
    stm.addEventListener("click", ract)
    //////////////////////////////////////
    function change() {
      const val = document.querySelector('input').value;
      document.getElementById("city-2").innerHTML= val;
      let now = new Date();
      const dayNames = ["Sunday", "Monday", "Tuesday"," Wednesday"," Thursday","Friday"];
      let day = now.getDay();
      let hour = now.getHours();
      let min = now.getMinutes();
      document.getElementById("timing").innerHTML= `${dayNames[day]}   ${hour}:${min}`;
      
    }
    let primary = document.getElementById("prim")
    primary.addEventListener("click",change)
    
    /////////////////////////////////////////////
    function dama(params) {
      document.getElementById("number").innerHTML="14"
    }
    let clicus = document.getElementById("cli")
    clicus.addEventListener("click",dama)

    function dama_F() {
      document.getElementById("number").innerHTML="66"
    }
    let farenheit = document.getElementById("faren")
    farenheit.addEventListener("click",dama_F)
    
    */

     //////////////////////////////////////////////////////
     
      function seven_day_display(response){
        console.log(response.data)
        let lable =[];
        let tempur =[];
        for (let i = 0; i < response.data.list.length; i++) {
          const element = Math.round((response.data.list[i].main.temp)-273);
          let text = response.data.list[i].dt_txt;
          text_time_day = text.split("-")
          text_time = text_time_day[2].split(" ")
          text_time = text_time_day[2].split(":")
          lable.push(
            text_time[0].replace(" ", "-")
          )
          tempur.push(
            element
          )
        }
        console.log(tempur);
        console.log(lable);
        const ctx = document.getElementById('myChart');
        let chart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: lable,
            datasets: [{
              label: 'day - time',
              data: tempur,
              fill: true,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            }]
          }
        });
    //  chart.update();
      }

      function seven_day(response) {
        console.log(response.data)
        let apikey ="3679755b1ebb6cd9b2cd32048242a186";
        let la_city = response.data.coord.lat;
        let lon_city = response.data.coord.lon;
        let urlposition = `https://api.openweathermap.org/data/2.5/forecast?lat=${la_city}&lon=${lon_city}&appid=${apikey}`;
        axios.get(urlposition).then(seven_day_display)
      }
     function displaywheather(response) {
      let show_name_city = response.data.name;
      document.getElementById("feels_like").innerHTML= Math.round(response.data.main.feels_like) ;
      document.getElementById("city-2").innerHTML = show_name_city;
      
      
  ///////////set current time
      let seconds = response.data.timezone;
      const totalMinutes = Math.floor(seconds/ 60);
      let hour = Math.floor(totalMinutes / 60)
      const minutes = totalMinutes % 60;
      let now = new Date();
      const dayNames = ["Sunday", "Monday", "Tuesday"," Wednesday"," Thursday","Friday"];
      const day = now.getDay();
      const hourUTC = now.getUTCHours();
      const minutesUTC = now.getUTCMinutes();
      const extre = Math.floor((minutes+minutesUTC)/ 60);
      const f_minutesUTC = (minutes+minutesUTC)%60;
      const f_hour = ((hour+ hourUTC+extre)%24);
      
      document.getElementById("timeset").innerHTML = `${dayNames[day]}  ${f_hour}:${f_minutesUTC}` ;
/////////////cli to faren
      document.getElementById("number").innerHTML = Math.round(response.data.main.temp);
      let show_dama = Math.round(response.data.main.temp);
      function dama(event) {
        document.getElementById("number").innerHTML= show_dama;
        let element = document.getElementById("cli");
        element.style.color = "#ffffff";
        let element2 = document.getElementById("faren");
          element2.style.color = "#000dff";
      }
      function dama_F(event) {
          let faren= (((show_dama)*1.8)+32);
            faren = Math.floor(faren);
            document.getElementById("number").innerHTML= faren;
            let element = document.getElementById("faren");
            element.style.color = "#ffffff";
            let element2 = document.getElementById("cli");
            element2.style.color = "#000dff";
            
      }
      
      let clicus = document.getElementById("cli")
      clicus.addEventListener("click",dama)
      let farenheit = document.getElementById("faren")
      farenheit.addEventListener("click",dama_F)
////////change image
      document.querySelector("image");
      let temp = Math.round(response.data.main.temp);
      if (temp>20) {
        image.src = "image/3.png";
      }else if(10<temp<20){
        image.src = "image/2.png";
      }else if(5<temp<10){
        image.src = "image/0.png";
      }else{
        image.src = "image/1.png";
      }
      document.getElementById("humidity").innerHTML = response.data.main.humidity;
      // document.getElementById("wind").innerHTML = Math.round(response.data.main.wind.speed);
      document.getElementById("description").innerHTML = response.data.weather[0].main;
      // let iconElement = document.querySelector("image");
      // iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
      // iconElement.setAttribute("alt", response.data.weather[0].description);
      
   }
   
   function search_city(event) {
    let apikey ="3679755b1ebb6cd9b2cd32048242a186";
    let name_city =document.querySelector('input').value;
    let apiurl=`http://127.0.0.1:3000/api/?q=${name_city}`;
    axios.get(apiurl).then(function (response) {
      displaywheather(response);
      seven_day(response);
    })
   }
   
   function search_current(position) {
    let apikey ="3679755b1ebb6cd9b2cd32048242a186";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apikey}`;
    axios.get(url).then(displaywheather)
    console.log(url)
   }

   
   
  navigator.geolocation.getCurrentPosition(search_current);
  let search = document.getElementById("prim")
  search.addEventListener("click",search_city)
  let CurrentCity = document.getElementById("suc")
  CurrentCity.addEventListener("click",search_current)
   

  // const val = document.querySelector('input').value;
  // let apikey ="ec8f193f7fd944f04d8a07c5f89c9729";
  // let click = document.getElementById("prim")
  // click.addEventListener("click",function(){
  //   axios.get(`https://pro.openweathermap.org/data/2.5/forecast/?q=${name_city}&appid=${apikey}`)
  //   .then(response=>response.json())
  //   .then(data=>console.log(data))
  //   .catch(err=>console.log("wrong"))
  // })


  // function search_city2(event) {
  //   let apikey ="ec8f193f7fd944f04d8a07c5f89c9729";
  //   let name_city =document.querySelector('input').value;
  //   let apiurl=`https://pro.openweathermap.org/data/2.5/forecast/?q=${name_city}&appid=${apikey}`;
  //   axios.get(apiurl).then(displaywheather)
  //  }
  //  let search2 = document.getElementById("prim")
  // search2.addEventListener("click",search_city2)
  
    
    