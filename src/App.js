import React from 'react';
import logo from './logo.svg';
import './App.css';
import { MenuItem } from '@mui/material';
import MainPage from './elements/mainPage/mainPage.jsx'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { common } from '@mui/material/colors';
var valutesName=[];
var valutesNameList=[];

var temp=0;
var temp2=0;
var courseAndVal = new Map();
function App() {
   const [valuteInfo,setValuteInfo] = React.useState([])
   React.useEffect(()=>{
    fetch('https://www.cbr-xml-daily.ru/daily.xml')
    .then(res => res.arrayBuffer()) 
    .then(resText => {
      var decoder = new TextDecoder('utf-8');
      let decodedMessage =  new TextDecoder('windows-1251').decode(resText);
      console.log(decodedMessage)
      let xmlText='<ValCurs>';
      let count=0;
      for(let i=0;i<decodedMessage.length;i++){
          if(count>=2){
              xmlText+=decodedMessage[i];
              continue;
          }
          if(decodedMessage[i]===">"){
              count+=1;
          }
      }
  
      const parser = new DOMParser();
      
      const xmlData = parser.parseFromString(xmlText, "text/xml");
      setValuteInfo( xmlData.querySelector("ValCurs").querySelectorAll("Valute"));

      //valutesNameList=[];
      
      // for(let i=0;i<valuteInfo.length;i++){
      //   temp=valuteInfo[i].querySelector("CharCode").textContent;
      //   valutesNameList.push(<MenuItem key={temp} value={temp}>{temp}</MenuItem>)
      // }
      })
   
      //console.log(valuteInfo)
   },[])
    valutesNameList=[<MenuItem key={"RUB"} value={"RUB"}>{"RUB(Российские Рубли)"}</MenuItem>]
    for(let i=0;i<valuteInfo.length;i++){
      temp = valuteInfo[i].querySelector("CharCode").textContent
      temp2= valuteInfo[i].querySelector("Name").textContent
      valutesNameList.push(<MenuItem key={temp} value={temp}>{temp+'('+temp2+')'}</MenuItem>)
      temp2=parseFloat(valuteInfo[i].querySelector("Value").textContent.replace(',','.'))/parseInt(valuteInfo[i].querySelector("Nominal").textContent)
      courseAndVal.set(temp,temp2)
    }
    

    return ( 
      
      <BrowserRouter>
      
          <div className='App'>
            <Routes>
              
              <Route element={<MainPage courseAndVal={courseAndVal} valutesNameList={[<MenuItem key={"RUB"} value={"RUB"}>{"RUB"}</MenuItem>,<MenuItem key={"UER"}value={"UER"}>{"EUR"}</MenuItem>,<MenuItem key={"USD"}value={"USD"}>{"USD"}</MenuItem>]}> </MainPage>}path={"/mainPage"}></Route>
               
              <Route element={<MainPage courseAndVal={courseAndVal} valutesNameList={valutesNameList}></MainPage>}path={"/"}></Route>
  
  
            </Routes>
          </div>
        </BrowserRouter>
    );

}

export default App;
