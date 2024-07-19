

//import {TabulatorFull as Tabulator} from 'tabulator-tables';
// DDX Bricks Wiki - See https://developer.domo.com/docs/ddx-bricks/getting-started-using-ddx-bricks
// for tips on getting started, linking to Domo data and debugging your app
 
//Available globals
var domo = window.domo; // For more on domo.js: https://developer.domo.com/docs/dev-studio-guides/domo-js#domo.get
// var datasets = window.datasets;
var sheetDef = [];
let uniqueFacNames = [];
var sheetValues = [];
var sheets = [];
var sheetData = [];
var fac =[];
const facSet = new Set();
const columnNames = new Set();
var dataValues =[];
var dataResult = [];
//let desired_output = [];
//let facNameFirst30 = [];

//Step 1. Select your dataset(s) from the button in the bottom left corner


//console.log("Before GET");
//Step 2. Query your dataset(s): https://developer.domo.com/docs/dev-studio-references/data-api
// Form the data queries: https://developer.domo.com/docs/dev-studio-guides/data-queries
var fields = ['PharmacyLocation','FacName','PharmID','PatientName','PatBirthDate'];
var query2Fields = ['PharmacyLocation','FacName','ActivePatientCount'];
var query2GroupBy = ['PharmacyLocation','FacName','ActivePatientCount'];
var groupby = ['PharmacyLocation','FacName','PharmID','PatientName','PatBirthDate'];
// var query = `/data/v1/${datasets[0]}?fields=${fields.join()}&groupby=${groupby.join()}`;
var query2 = `data/v1/${datasets[1]}`;
//var query2 = `/data/v1/${datasets[1]}?fields=${query2Fields.join()}&groupby=${query2GroupBy.join()}`;
domo.get(query2).then(handleResult); /*ORIGINAL CODE*/
/*
Promise.all([
// domo.get(`data/v1/${datasets[0]}`), 
domo.get(query, {format: 'array-of-arrays'}),

  
]).then(showValues);
*/
// domo.get(query2, {format: 'array-of-arrays'}).then(handleResult),

//Step 3. Do something with the data from the query result
function handleResult(data){
 // console && console.log("query2 Data", data);
//console.log("dataValues",JSON.stringify(data));
for (i = 0; i < data.length; i++) {
  //console.log(data[i]);
  dataResult.push([i, data[i]]);
/*
var dataTable = new google.visualization.DataTable();
dataTable.addColumn('PharmacyLocation', 'FacName');
dataTable.addColumn('facName', 'PharmID');
dataTable.addColumn('PatientName','PatBirthDate');
dataTable.addRows(dataResult);
cosole.log(dataTable);
*/
} 
for (i = 0; i < dataResult.length; i++) {
 //console.log(dataResult[i]);
  

} 
console.log("Objectvalues: ",Object.values(dataResult)[0][1].PharmacyLocation);
/*
for(var i in data)
    dataResult.push([i, data[i]]);
var dataTable = new google.visualization.DataTable();
dataTable.addColumn('PharmacyLocation', 'FacName');
dataTable.addColumn('facName', 'PharmID');
dataTable.addColumn('PatientName','PatBirthDate');
dataTable.addRows(dataResult);
cosole.log(dataTable);
*/

let uniqueFacNames = data.map((item) =>{
    //fac.push(item.FacName);
    //return item.FacName
    facSet.add(item.FacName);
    columnNames.add(Object.keys(item)); 
     // Get the keys
let keys = Object.keys(item);



// Printing keys
//console.log("Keys",keys[0]);
    // console.log("item ",item);
    
 }
 );
 //console.log("FacSet ",facSet);
//let unique = [...new Set(fac)];

//console.log("Unique", JSON.stringify(unique));

/*
 var sheets = facSet.forEach((element) => {
    //console.log("Element",element);
    //console.log("Element Type",typeof(element));
    return {
      title:element,
      key:"first",
      rows:20,
      columns:20,
      data:[
       data
      ]
  }
});
*/
 /*Create Dynamic Sheets*/
 //[...facSet].reduce(...)
 const facSetArray = [...facSet];
 const columnNamesArray = [...columnNames];
 //console.log("facSetArray Len ",facSetArray.length);


 
 var sheets = facSetArray.map((item) =>{
    //console.log("sheet Facs ",item);
    
    return{
      title:item,
      key:"first",
      rows:20,
      columns:5,
      data:[
       //Object.values(dataResult[0])
       [9937,	"",	"",	7749,	9816,	4355,	8279,	"",	""],
        [2380,	"",	6977,	8896,	4012,	3803,	5408,	3415,	3056],
        [9180,	"",	39,	9445,	3917,	"",	18,	5239,	2516],
        [1924,	8734,	1819,	1838,	2330,	7921,	9219,	"",	3537],
      ]
  }
    
 }
 );

 var sheetColumns = columnNamesArray.map((item) =>{
    //console.log("sheet Facs ",item);
    
    return //console.log("sheetColumns ",Object.keys(item));
     
  
    
 }
 );

 //console.log("columnNamesArray  Len", columnNamesArray.length);
 //console.log("facSetArray len ",facSetArray.length);
 
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
 
 co
];
*/
//console.log("Data Columns: ", columnNames.size);
//Build Tabulator
var table = new Tabulator("#example-table", {
    height:"311px",
   downloadRowRange:"selected",
    spreadsheet:true,
    spreadsheetRows:10,
    spreadsheetColumns:1,
    spreadsheetColumnDefinition:{title:data[1], field:data[1], width:200, editor:"input"},
    spreadsheetSheets:sheets,
    spreadsheetSheetTabs:true,

    rowHeader:{field:"_id", hozAlign:"center", headerSort:false, frozen:true},
    columns:[
        {title:"Name", field:"PharmacyLocation", width:200, editor:"input"},
        {title:"Progress", field:"progress", width:100, hozAlign:"right", sorter:"number", editor:"input"},
        {title:"Gender", field:"gender", editor:"input"},
        {title:"Rating", field:"rating", hozAlign:"center", width:80, editor:"input"},
        {title:"Favourite Color", field:"col", editor:"input"},
        {title:"Date Of Birth", field:"dob", hozAlign:"center", sorter:"date", editor:"input"},
        {title:"Driver", field:"car", hozAlign:"center", editor:"input"},
    ],
    

    editorEmptyValue:undefined, //ensure empty values are set to undefined so they arent included in spreadsheet output data

});




//trigger download of data.xlsx file
document.getElementById("download-xlsx").addEventListener("click", function(){
    table.download("xlsx", "data.xlsx", {sheetName:"My Data"});
});


// table.download("xlsx", "data.xlsx", {}); //download table data as a XLSX formatted file with a file name of data.xlsx




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
