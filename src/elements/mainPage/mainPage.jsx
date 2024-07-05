import React,{ useEffect, useState }  from 'react';
import Button from '@mui/material/Button';
import Reverse_btn_icon from '../../common/reverse_btn.png'
import Options_btn_icon from '../../common/options_btn.png'
import Select from '@mui/material/Select';
import {  Stack,MenuItem,FormControl,InputLabel,Box, TextField,Dialog,DialogTitle,DialogContent,OutlinedInput,DialogActions } from '@mui/material';

let buff;
let count =0;

function MainPage(props) {
    

    const [Valute1, setValute1] = React.useState('');
    
    const handleChange1 = (event) => {
      setValute1(event.target.value);
      let res = parseFloat(Input1)
      let answer = document.getElementById("AnswerLabel");
      if(!isNaN(res) && Valute1!='' && Valute2!=''){
          if(Valute1!=Valute2){
              if(Valute2=="RUB"){
                  res*=props.courseAndVal.get(Valute1);
              }else if(Valute1=="RUB"){
                  res/=props.courseAndVal.get(Valute2);
              }else{
                  res*=props.courseAndVal.get(Valute1);
                  res/=props.courseAndVal.get(Valute2);

              }
          }
          
          answer.textContent="Итого: "+res;
      }else{
          answer.textContent="Итого: "
      }
    };
    const [Valute2, setValute2] = React.useState('');

    const handleChange2 = (event) => {
      setValute2(event.target.value);
      let res = parseFloat(Input1)
        let answer = document.getElementById("AnswerLabel");
        if(!isNaN(res) && Valute1!='' && Valute2!=''){
            if(Valute1!=Valute2){
                if(Valute2=="RUB"){
                    res*=props.courseAndVal.get(Valute1);
                }else if(Valute1=="RUB"){
                    res/=props.courseAndVal.get(Valute2);
                }else{
                    res*=props.courseAndVal.get(Valute1);
                    res/=props.courseAndVal.get(Valute2);

                }
            }
            
            answer.textContent="Итого: "+res;
        }else{
            answer.textContent="Итого: "
        }
    };
    const [Input1, setInput1] = React.useState('');

    const Input1Change = (event) => {
        var temp = event.target.value;
        let res ="";
        let IsPointsIn =false;
        let lenOfIntegerPart=0;
        let lenOfFractionalPart=0;
        for(let i =0;i<temp.length;i++){
            
            if(temp[i]==',') { 
                if(IsPointsIn==false){
                    IsPointsIn=true
                    res+='.'

                }
                continue;
            }
            if(temp[i]=='.'){
                if(IsPointsIn==false){
                    IsPointsIn=true;
                }else{
                    continue;
                }
            }
            if(temp[i]!='0'&& temp[i]!='.' && temp[i]!='1'&& temp[i]!='2'&& temp[i]!='3'&& temp[i]!='4'&& temp[i]!='5'&& temp[i]!='6'&& temp[i]!='7'&& temp[i]!='8'&& temp[i]!='9' ){
                continue;
            }
            if(IsPointsIn){
                lenOfFractionalPart+=1;
            }else{
                lenOfIntegerPart+=1;
            }
            if(lenOfIntegerPart>15){
                lenOfIntegerPart=15;
                continue;
            }
            if(lenOfFractionalPart>5){
                break;
            }
            res+=temp[i];
            
        }
      
        setInput1(res);
        res = parseFloat(res)
        let answer = document.getElementById("AnswerLabel");
        if(!isNaN(res) && Valute1!='' && Valute2!=''){
            if(Valute1!=Valute2){
                if(Valute2=="RUB"){
                    res*=props.courseAndVal.get(Valute1);
                }else if(Valute1=="RUB"){
                    res/=props.courseAndVal.get(Valute2);
                }else{
                    res*=props.courseAndVal.get(Valute1);
                    res/=props.courseAndVal.get(Valute2);

                }
            }
            
            answer.textContent="Итого: "+res;
        }else{
            answer.textContent="Итого: "
        }
      };

    const reverse_btn_click = ()=>{
        console.log("Был клин на кнопку смены валют")
        
        buff = Valute1;
        setValute1(Valute2)
        setValute2(buff);

    };
    const [open,setOpen] = useState(false);
    const [baseValute,setBaseValute] = useState('');
    const selectBaseVal = (event) =>{
        
        setBaseValute(event.target.value)
        
        if(event.target.valut!=''){
            localStorage.baseValute=event.target.value;
            console.log(localStorage.baseValute)
        }
    }
    const handleClose = (event, reason) => {
        if (reason !== 'backdropClick') {
          setOpen(false);
          if(localStorage.baseValute=="undefined"){
            localStorage.baseValute="RUB";
            
            setBaseValute("RUB");
          }
        }
      };
    const options_btn_click=()=>{
        console.log("Был клик на кнопку настроек")
        setOpen(true);
    }
    
    useEffect(()=>{
    if(localStorage.baseValute=="undefined" || localStorage.baseValute==undefined){ 
       
         if(count<2){
         count+=1;
         setOpen(true);
        }

    }else{
        
         setBaseValute(localStorage.baseValute)
        console.log(Valute2)
         if(Valute2==''){
         setValute2(baseValute);}
    }})

    return (
        <div className='MainDiv' >
            <Box display={'flex'}>
           <Button variant="text" 
            id='options_btn' onClick={options_btn_click} > <img src={Options_btn_icon} width={40} height={40} alt="options"/></Button>
            </Box>

            <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Выберите базовую валюту</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel htmlFor="selectBaseValLabel">Валюта</InputLabel>
              <Select
                labelId="selectBaseValLabel"
                id="selectBaseVal"
                value={baseValute}
                label="baseValute"
                onChange={selectBaseVal}
            > 
            
            {props.valutesNameList}
                
            </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>

            <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            >
            <Box minWidth={150}> 
            <FormControl fullWidth>
            <InputLabel id="slectLebel1">Валюта</InputLabel>
            <Select
                labelId="slectLebel1"
                id="select1"
                value={Valute1}
                label="Valute1"
                onChange={handleChange1}
            > 
            
            {props.valutesNameList}
                
            </Select>
            </FormControl>
            </Box>

            <Box minWidth={150}> 
            <TextField fullWidth id="Input1" value={Input1} onChange={Input1Change}  >

            </TextField>
            
            </Box>
            <Button variant="contained" 
            
             id='reverse_btn' onClick={reverse_btn_click}><img src={Reverse_btn_icon} width={40} height={25} alt="reverse"/></Button>
            
            <Box minWidth={150}> 
            <FormControl fullWidth>
            <InputLabel id="slectLebel2">Валюта</InputLabel>
            <Select
                labelId="slectLebel2"
                id="select2"
                value={Valute2}
                label="Valute2"
                onChange={handleChange2}
            > 
            
            {props.valutesNameList}
                
            </Select>
            </FormControl>
            </Box>
            <label id="AnswerLabel">Итого:</label>

            </Stack>

        </div>
    );
}

export default MainPage;