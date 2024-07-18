

//import {TabulatorFull as Tabulator} from 'tabulator-tables';
// DDX Bricks Wiki - See https://developer.domo.com/docs/ddx-bricks/getting-started-using-ddx-bricks
// for tips on getting started, linking to Domo data and debugging your app
 
//Available globals
var domo = window.domo; // For more on domo.js: https://developer.domo.com/docs/dev-studio-guides/domo-js#domo.get
var datasets = window.datasets;
var sheetDef = [];
let uniqueFacNames = [];
var sheetValues = [];
var sheets = [];
//let desired_output = [];
//let facNameFirst30 = [];

//Step 1. Select your dataset(s) from the button in the bottom left corner


//console.log("Before GET");
//Step 2. Query your dataset(s): https://developer.domo.com/docs/dev-studio-references/data-api
var fields = ['PharmacyLocation','FacName','PharmID','PatientName','PatBirthDate'];
var groupby = ['PharmacyLocation','FacName','PharmID','PatientName','PatBirthDate'];
var query = `/data/v1/${datasets[0]}?fields=${fields.join()}&groupby=${groupby.join()}`;
domo.get(query).then(handleResult);



//Step 3. Do something with the data from the query result
function handleResult(data){
 //  console && console.log(data);


  function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}
  
 let facNameFirst30 = data.map((item) =>{
    return item.FacName.substring(0,30)
 }
 );
 // console.log("Unique ",(Object.values(facNameFirst30).filter(onlyUnique)));
/*Put Unique FacNames into uniqueFacNames */
  var uniqueFacNames = data.map((item) =>{
   return (item.FacName);
 }
 );
 var uniqueFacNames = Object.values(uniqueFacNames).filter(onlyUnique);

 //console.log("UniquesName ",uniqueFacNames);
 //console.log("Data Type ",typeof(data));

// uniqueFacNames.forEach((element) => console.log("Element",element));
  
  /*FOR EACH Create Dynamic Sheets*/
 
 /*
 var sheets = uniqueFacNames.forEach((element) =>{
    
     return {
      title:element,
      key:"first",
      rows:20,
      columns:20,
      data:[
       data
      ]
  }
    
 }
 );
 console.log ("Sheets ",sheets)
 */



/*Dynamic Sheets Example */
/*
let desired_output = (uniqueFacNames) => {
    let unique_values = uniqueFacNames
        data.map((item) => item.FacName)
        .filter(
            (value, index, current_value) => current_value.indexOf(value) === index
        );
    return unique_values;
    
};
*/
/*Dynamic Sheets Example */
let desired_output = (uniqueFacNames) => {
    let unique_values = uniqueFacNames
        data.map((item) => item.FacName)
        .filter(
            (value, index, current_value) => current_value.indexOf(value) === index
        );
    return unique_values;
    
}; 
//console.log("Example",(desired_output(uniqueFacNames)));
console.log("desired_output type", typeof(desired_output(uniqueFacNames)));
 
 var sheetValuesPush = desired_output(uniqueFacNames).forEach((element) =>{
    //console.log("ForEach ",element.substring(0,30));
    sheetValues.push(element);
    
    
 },
  );
 console.log("sheetValues ",sheetValues);



 /*Create Dynamic Sheets*/
 
 var sheets = sheetValues.map((item) =>{
    
    return {
      title:item,
      key:"first",
      rows:20,
      columns:20,
      data:[
       data
      ]
  }
    
 }
 );
 
 /*
  var sheets = [
    {
      title:facNameFirst30,
      key:"first",
      rows:20,
      columns:20,
      data:[
       facNameFirst30
      ]
  },
 
 
];
*/
// console.log("Sheets Data: ", sheets);
//Build Tabulator
var table = new Tabulator("#example-table", {
    height:"311px",

    spreadsheet:true,
    spreadsheetRows:10,
    spreadsheetColumns:10,
    spreadsheetColumnDefinition:{editor:"input"},
    spreadsheetSheets:sheets,
    spreadsheetSheetTabs:true,

    rowHeader:{field:"_id", hozAlign:"center", headerSort:false, frozen:true},

    editorEmptyValue:undefined, //ensure empty values are set to undefined so they arent included in spreadsheet output data
});
}

/*ORIGINAL DOMO CODE */

/*
function handleResult(data){

//console.log("handleResult data: ",data);

// let result = data.map(a => a.PatientName);
  let result = data.map(o => { return {PharmacyLocation: o.Column1, FacName: o.FacName ,PatientName: o.PatientName,PatBirthDate: o.PatBirthDate} })
  console.log("result: ",result);

  var table = new Tabulator("#example-table", {
   data:result,
   //renderHorizontal:"virtual",
   autoColumns:true,
   height:"311px",
   layout:"fitColumns",
   //layout:"fitDataTable",
   //layout:"fitDataStretch",
   columns:[
       {title:"Default Pharmacy Location", field:0}, //column has a fixed width of 100px;
       {title:"Patient Name", field:"1"},//column will be allocated 1/5 of the remaining space
       {title:"BirthDate", field:"2"}, //column will be allocated 3/5 of the remaining space
       {title:"FacName", field:"3"} // column has a default widthGrow of 1 and will be allocated 1/5 of the remaining space
    ],
    });
    */ 
