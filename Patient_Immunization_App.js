

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
var ac =[];
var dom = document.getElementById("example-table");
var facNamesDup = [];

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
// Assume `data` is your dataset with each entry containing a facility and patient information

// 1. Extract unique facilities
let uniqueFacilities = [...new Set(data.map(item => item.FacName))];

// 2. Group patients by facility
let facilityData = {};
uniqueFacilities.forEach(facility => {
  facilityData[facility] = data.filter(item => item.FacName === facility);
});

// 3. Create sheets for each facility
let sheets = uniqueFacilities.map(facility => {
  return {
    title: facility,
    key: facility,
    rows: 5, // Adjust the number of rows as needed
    columns: [
      { title: "Patient Name", field: "PatientName" },
      { title: "DOB", field: "PatBirthDate" },
      // Add other relevant fields here
    ],
    data: facilityData[facility].map(patient => ({
      "Patient Name": patient.PatientName,
      "DOB": patient.PatBirthDate,
      // Map other fields here
    }))
  };
});

// Initialize Tabulator with the sheets
var table = new Tabulator("#example-table", {
  height: "311px",
  layout: "fitColumns",
  columns: [
    { title: "Patient Name", field: "Patient Name" },
    { title: "DOB", field: "DOB" },
    // Define additional columns if needed
  ],
  data: facilityData[uniqueFacilities[0]].map(patient => ({
    "Patient Name": patient.PatientName,
    "DOB": patient.PatBirthDate,
    // Map other fields here
  })),
  // Define other Tabulator options here
  sheetOptions: {
    spreadsheet: true,
    sheets: sheets,
    sheetTabs: true,
    rowHeader: { field: "id", hozAlign: "center", headerSort: false, frozen: true },
  }
});

// Handle download button click
document.getElementById("download-xlsx").addEventListener("click", function(){
  table.download("xlsx", "FacilityPatients.xlsx", {sheets: sheets});
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
