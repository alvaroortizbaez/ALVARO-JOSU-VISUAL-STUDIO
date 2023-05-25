//Tiempo de refresco
msFreskatzeko=2000;
//Zenbat aldiz galdetu diot PLCri
var nKontsultaKopurua = 0;

//ALDAGAIAK
//Irteerak
var bLUZ_ROJA;
var bHPM; 

//Etiketa batzuk aldez aurretik sortuko ditut, gero bat edo bestea HTML dokumentuan jartzeko ...
var pilotoVerdeOFF = document.createElement("img");
pilotoVerdeOFF.setAttribute("src","img/pilotoOFF.JPG");
//<img src="./img/pilotoOFF.JPG"/> ---> gauza bera egiten ari naiz, baina dokumentuan momentuz jarri gabe ...
var PilotoVerdeON = document.createElement("img");
PilotoVerdeON.setAttribute("src","img/pilotoVerdeOn.JPG");
//<img src="./img/pilotoVerdeOn.JPG"/> ---> gauza bera egiten ari naiz, baina dokumentuan momentuz jarri gabe ...

var etengailuaOFF = document.createElement("img");
etengailuaOFF.setAttribute("src","img/etengailuaOFF.JPG");
var etengailuaON = document.createElement("img");
etengailuaON.setAttribute("src","img/etengailuaON.JPG");

//BOTOIA sakatzen dudanean, SUBMIT sakatuko banu bezala egin behar da 
etengailuaOFF.addEventListener( "click", e => {
   var formularioa = document.querySelector("#form1");
   var balioa = document.querySelector("#form1 input");
   balioa.setAttribute("value","1");
   formularioa.submit();
} );

etengailuaON.addEventListener( "click", e => {
   var formularioa = document.querySelector("#form1");
   var balioa = document.querySelector("#form1 input");
   balioa.setAttribute("value","0");
   formularioa.submit();
} );

//Cuando cargue la página, que se vaya refrescando ...
window.addEventListener('load', (event) => {
   console.log("AddEventListener atalean sartzen naiz");
   eskatuDatuakPLCri();   
   nTimer = setInterval(function(){
       eskatuDatuakPLCri();
   },msFreskatzeko);
});  

function eskatuDatuakPLCri(){
   console.log("eskatuDatuakPLCri atalean sartzen naiz");
   fetch("JSON.html")
   .then((response) => response.json())
   .then((json) => {
    //JSON Mezua osorik ikusteko
   console.log(json);
   //JSON mezu horretatik datuak hartu behar ditut
   jsonMezuarenDatuakHartu(json);
   //Hartutako datuak HTML orrialdean margotu
   datuakSartuOrrialdean();        
   }).catch((error) => {
        //Erroren bat badago, catch atal honetara ailegatuko gara
       console.log("CATCH atalean sartzen ari naiz: hona hemen gertatu den errorea: ");
       console.log(error);
       //<p id="pJSON-error"></p> HTML elementuan errorea azalduko da:
       document.getElementById("pJSON-error").innerHTML="Errorea gertatu da PLCtik irteerak irakurtzean. Ikusi garatzailearentzako kontsolan"
   }).finally(() => {
        //Finally atala erabiltzen da exekutatzen den kode bat jartzeko, bai errore bat gertatu bada, bai dena ondo joan bada
        //<p id="pPLCriEskaerak"></p> HTML elementuan PLCri eskaera kopurua agertuko da
        console.log("FINALLY atalean sartzen ari naiz");
        nKontsultaKopurua+=1;
        document.getElementById("spanPLCriEskaerak").innerText = nKontsultaKopurua;
   }); 
}

function jsonMezuarenDatuakHartu( jsonObj ){     
   console.log("jsonMezuarenDatuakHartu atalean sartzen naiz");
   //JSON String aldagaia hartzeko
   bLUZ_ROJA = jsonObj['PROZEZUA_MARTXAN_DAGO?']=="1"?true:false;
   nIEC_Counter_0_DB = parseInt(jsonObj['ZENBAT_ZIKLO_EGIN_DITU?']);
   bHPM = jsonObj['HPM']=="1"?true:false;
}

function datuakSartuOrrialdean(){
  console.log("datuakSartuOrrialdean atalean sartzen naiz");
  tdPROZEZUA_MARTXAN_DAGO = document.getElementById("tdPROZEZUA_MARTXAN_DAGO?");

  if (bLUZ_ROJA){
   console.log("bLUZ_ROJA ON atala");
   if(tdPROZEZUA_MARTXAN_DAGO.children[0]!=null){
      console.log("ez dago hutsik");
      tdPROZEZUA_MARTXAN_DAGO.children[0].remove();
   }
   tdPROZEZUA_MARTXAN_DAGO.append(PilotoVerdeON);
  } else {
   console.log("bLUZ_ROJA OFF atala");
   if(tdPROZEZUA_MARTXAN_DAGO.children[0]!=null){
      console.log("ez dago hutsik");
      tdPROZEZUA_MARTXAN_DAGO.children[0].remove();
   }
   tdPROZEZUA_MARTXAN_DAGO.append(pilotoVerdeOFF);
  }
  
  //document.getElementById("tdPROZEZUA_MARTXAN_DAGO?").innerHTML = bLUZ_ROJA;
  document.getElementById("tdZENBAT_ZIKLO_EGIN_DITU?").innerHTML = nIEC_Counter_0_DB;

  pHPM = document.getElementById("pHPM");
  if (bHPM){
   pHPM.children[0].remove();
   pHPM.append(etengailuaON);
} else {   
   pHPM.children[0].remove();
   pHPM.append(etengailuaOFF);
   }
}


