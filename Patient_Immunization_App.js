

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
var parseData = [];
let patientName = new Set();
let facilities = new Set();
var arr = [];
var dom = document.getElementById("example-table");
var sheets = [];
var sampleData = [
        [1924,	8734,	1819,	1838,	2330,	7921,	9219,	"",	3537],
        ["",	8665,	5875,	9732,	1926,	"",	9743,	8388,   ""],
        [7040,	4861,	2988,	5584,	2344,	9749,	8872,	9177,	6246],
        [6334,	1674,	2967,	"",	9353,	396,	6006,	8572 , ""],
        [6359,	"",	2580,	5723,	9801,	554,	1044,	5266,	8532],
        [7278,	6971,	2232,	5720,	5665,	7231,	1165,	"",	168],
      ];
var tabulatorSampleData = [
    {id:1, name:"Billy Bob", age:"12", gender:"male", height:1, col:"red", dob:"", cheese:1},
    {id:2, name:"Mary May", age:"1", gender:"female", height:2, col:"blue", dob:"14/05/1982", cheese:true},
    {id:3, name:"Christine Lobowski", age:"42", height:0, col:"green", dob:"22/05/1982", cheese:"true"},
    {id:4, name:"Brendon Philips", age:"125", gender:"male", height:1, col:"orange", dob:"01/08/1980"},
    {id:5, name:"Margret Marmajuke", age:"16", gender:"female", height:5, col:"yellow", dob:"31/01/1999"},
    {id:6, name:"Billy Bob", age:"12", gender:"male", height:1, col:"red", dob:"", cheese:1},
    {id:7, name:"Mary May", age:"1", gender:"female", height:2, col:"blue", dob:"14/05/1982", cheese:true},
    {id:8, name:"Christine Lobowski", age:"42", height:0, col:"green", dob:"22/05/1982", cheese:"true"},
    {id:9, name:"Brendon Philips", age:"125", gender:"male", height:1, col:"orange", dob:"01/08/1980"},
    {id:10, name:"Margret Marmajuke", age:"16", gender:"female", height:5, col:"yellow", dob:"31/01/1999"},
];

const object1 = [];
const object2 = [];

   // Your JSON data
    const jsonData = {
      "columns": [
        {
          "title": "FacilityTitle",
          "field": "facilitytitle",
          "width": 50
        },
        {
          "title": "PatientNameTitle",
          "field": "patientnametitle",
          "width": 150
        },
        {
          "title": "PatientDOBTitle",
          "field": "patientdobtitle",
          "width": 50,
          "align": "right"
        }
      ],
      data: [
        {
          "facilitytitle": "facility",
          "patientnametitle": "John Doe",
          "patientdobtitle": "date"
        },
       
      ]
      };
      const tabledata = [{
  id: 1,
  name: "Oli Bob",
  age: "12",
  col: "red",
  dob: ""
}, {
  id: 2,
  name: "Mary May",
  age: "1",
  col: "blue",
  dob: "14/05/1982"
}, {
  id: 3,
  name: "Christine Lobowski",
  age: "42",
  col: "green",
  dob: "22/05/1982"
}, {
  id: 4,
  name: "Brendon Philips",
  age: "125",
  col: "orange",
  dob: "01/08/1980"
}, {
  id: 5,
  name: "Margret Marmajuke",
  age: "16",
  col: "yellow",
  dob: "31/01/1999"
}, ];
    
     // console.log("sample Data",sampleData);
     console.log("tabulatorSampleData",tabulatorSampleData);
     
     
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
 const map1 = new Map();
 const parseData = JSON.parse(JSON.stringify(data));
//console.log("parse Data ",parseData[0]);
 data.forEach(element => {
   arr.push(element.FacName);
   //console.log("element",element);
   object1.push({
            facility: element.FacName, 
            patient:  element.PatientName,
            dob: element.PatBirthDate
        });
  object2.push(element);
   map1.set('facility:', element.FacName);
   map1.set('patient:', element.PatientName);
   map1.set('dob:', element.PatBirthDate);
  //console.log("dataElements:",element);
});
console.log("object1",object1);
console.log("object2",object2[1]);
//console.log("Keys",Object.keys(object1));
//console.log("data", data.FacName);
const map1DataPart = map1.data;
/*Convert Onject to Array*/
var result = Object.keys(object1).map((key) => [key, object1[key]]);


/*Convert Set to Array*/
const setArray = Array.from(map1);
//console.log("setArray", setArray);
//console.log("object1",object1);

//console.log("map1",map1[0][0])
/*
const facilityValue = map1.get('facility','patient');
console.log("facilityValue",facilityValue);

for (let value of map1.values()) {
    console.log("Values",value);
}
*/
 var sheetValuesArray = data.map(o => new Object({facilitytitle: o.FacName, patientnametitle: o.PatientName, patientdobtitle: o.PatBirthDate}))
 //console.log("sheetValuesArray",sheetValuesArray);
 
 



// Accessing the "data" part



 //console.log(arr);
 // console && console.log("query2 Data", data);
 //console.log("dataStringify, ",JSON.stringify(data));
 //console.log("dataParse ",JSON.parse(JSON.stringify(data)));
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

//console.log("Objectvalues: ",Object.values(dataResult)[0][1].PharmacyLocation);
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
    patientName.add(item.PatientName);
    facilities.add(item.FacName); 
   
     // Get the keys
let keys = Object.keys(item);



//console.log("patients,",patientName.forEach(logSetElements))
// Printing keys
//console.log("Keys",keys[0]);
    // console.log("item ",item);
    
 }
 );
 
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
let patValues = patientName.values();
let facilitiesValues = facilities.values();
//onsole.log("patValues ",patValues);
//console.log(patValues.next().value);
let outputArray = [];


let unique = [...new Set(data.map(item => item.FacName))];
//console.log("unique length", unique.length);
//console.log("unique ", unique);

 
 
 
 let sheetValues = [...new Set(data.map(o => ({name: o.FacName, pat: o.PatientName})))];
 let uniqueFacs = [...new Set(data.map(item => item.FacName))];
 let uniquePats = [...new Set(data.map(item => item.PatientName))];
 //console.log("o Name", uniqueFac);
 
 
 
 
 var sheets = uniqueFacs.map((facItem) =>{
  var pats = uniquePats.map((patItem) =>{ 
    //console.log("pats",  JSON.stringify(patItem, 4));
    //return patItem
  })
   //console.log("uniqueFac Len:",item.length);
  // console.log("uniqueFac",item);
 let clients = [{pharmacyLocation:"", patientName:"", dob:""}, {pharmacyLocation:"", patientName:"", dob:""}]
let clientsMapped = data.map(client => ({pharmacyLocation:client.PharmacyLocation, patientName:client.PatientName}))
let yourJson = JSON.stringify(clientsMapped)
//console.log("yourJSON Type ",sheetValuesArray);
const facilityValue = map1.get('facility');
//console.log("facilityValue",map1);
//console.log("tableData",map1[0]);

for (let value of map1.values()) {
    //console.log("Values",value);
}


const jsonDataArray = data.map(d => (([{
  
    "facility": d.FacName,
    "patient": d.PatientName,
    "dob": d.PatBirthDate
  
},])));
//onsole.log("Data Testing ",data[0].PatientName);
uniqueMapPatient = [...new Set(data.map(item => item.PatientName))];
 // console.log("uniqueMapPatient ",uniqueMapPatient);  
    const dataPart = jsonDataArray.data;

// Output the "data" part to the console
//console.log("jsonDataArray ",jsonDataArray[0][0].patient);
    
    return{
      title:facItem,
      key:facItem,
      rows:5,
      columns:2,
      data:[]//uniqueMapPatient //JSON.stringify(facilityValue)
        /*
        uniquePats.map((patItem) =>{ 
    //console.log("pats",  JSON.stringify(patItem, 4));
    return JSON.stringify(patItem, 4)
    
  })
  */
        /*
        [1924,	8734,	1819,	1838,	2330,	7921,	9219,	"",	3537],
        ["",	8665,	5875,	9732,	1926,	"",	9743,	8388,   ""],
        [7040,	4861,	2988,	5584,	2344,	9749,	8872,	9177,	6246],
        [6334,	1674,	2967,	"",	9353,	396,	6006,	8572 , ""],
        [6359,	"",	2580,	5723,	9801,	554,	1044,	5266,	8532],
        [7278,	6971,	2232,	5720,	5665,	7231,	1165,	"",	168],
      */
      
       /*
       [
       uniquePats.map((item) =>{ 
    //console.log("pats", item);
    return item
  })
       ]
      
      ]
      */
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
    layout:"fitDataFill",
    height:"311px",
    groupBy:"facility",
    columns:[
    {title:"Facility", field:"facility"},
    {title:"Patient", field:"patient", hozAlign:"right", sorter:"number"},
    {title:"Patient DOB", field:"dob"},
    
    ],
    data:object1 //sampleData 
    //index:"patient", //set the index field to the "age" field.
     //spreadsheet:true,
    //spreadsheetRows:10,
    //spreadsheetColumns:5,
    //spreadsheetColumnDefinition:{title:"First Column", field:data[1], width:200, editor:"input"},
    //spreadsheetSheets:sheets,
    //spreadsheetSheetTabs:true,
});

/*
var table = new Tabulator("#example-table", {
    height:"311px",
     downloadConfig:{
        columnHeaders:true, //include column headers in downloaded table
        columnGroups:false, //do not include column groups in column headers for downloaded table
        rowHeaders:false, //do not include row headers in downloaded table
        rowGroups:false, //do not include row groups in downloaded table
        columnCalcs:false, //do not include column calcs in downloaded table
        dataTree:false, //do not include data tree in downloaded table
    },
   //  downloadRowRange:"selected",
    spreadsheet:true,
    spreadsheetRows:10,
    spreadsheetColumns:5,
    spreadsheetColumnDefinition:{title:data[1], field:data[1], width:200, editor:"input"},
    spreadsheetSheets:sheets,
    spreadsheetSheetTabs:true,

    rowHeader:{field:"_id", hozAlign:"center", headerSort:false, frozen:true},
    columns:[
        {title:"name", field:"name", width:200, editor:"input"},
        {title:"age", field:"age", width:100, hozAlign:"right", editor:"input"},
        
        
    ],
    

    


    //editorEmptyValue:undefined, //ensure empty values are set to undefined so they arent included in spreadsheet output data

});
*/
//console.log("data string ",JSON.stringify(data));
//$("#example-table").tabulator("setData", tabulatorSampleData);

//trigger download of data.xlsx file

document.getElementById("download-xlsx").addEventListener("click", function(){
  table.download("xlsx", "AllData.xlsx", {sheets:sheets});
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
