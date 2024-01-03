
  function secToHour(sec){

    const minute =sec/60;
    const hour = sec/(60*60);
    const day = sec/(60*60*24);
    const week=sec/(60*60*24*7);
    const month=sec/(60*60*24*7*30);

    let Sec = Math.floor(sec -  (Math.floor(minute) * 60));
    let Min = Math.floor(minute -  (Math.floor(hour) * 60));
    let Hour = Math.floor(hour);
    let D=Math.floor(day);
    let W=Math.floor(week);
    let Mon=Math.floor(month);

       
    if (Hour == 0 && Min == 0){
    
        return(`${sec} sec `);
    }
    
    else if (Hour == 0){
        
        return(`${Min} min ${Sec} sec `);
    }
    else if(D==0){
      return(`${Hour} hrs ${Min} min `);
    }
    else if(W==0){
    
        return(`${D} days ${Hour} hrs `);
    }
    else if(Mon==0){
      return(`${W} weeks ${D}days ${Hour} hrs `);

    }
    else{
      return(`${Mon} months `);
 

    }

   
    
  }

