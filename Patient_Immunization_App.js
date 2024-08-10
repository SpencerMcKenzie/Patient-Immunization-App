

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
var table;
var FacTitles =[];

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
var fields = ['FacName','PharmID','PatientName','PatBirthDate','LotNumber','Vaccinator','WhichArm?','PaperWork'];
var query2Fields = ['FacName','PharmID','PatientName','PatBirthDate','LotNumber','Vaccinator','WhichArm?','PaperWork'];
var query2GroupBy = ['FacName','PharmID','PatientName','PatBirthDate','LotNumber','Vaccinator','WhichArm?','PaperWork'];
var groupby = ['FacName','PharmID','PatientName','PatBirthDate','LotNumber','Vaccinator','WhichArm?','PaperWork'];
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
function handleResult(data) {
  // Example logic to categorize data into sheets
    let sheetGroups = {};

    // Assume each item in domoData has a 'category' field to differentiate sheets
    data.forEach(item => {
        
        let category = item.FacName || 'Uncategorized';
        if (!sheetGroups[category]) {
            sheetGroups[category] = [];
        }
        sheetGroups[category].push(item);
    });

    // Create sheets from the grouped data
    // Create sheets from grouped data and sort by PatientName
  sheets = Object.keys(sheetGroups).map((category, index) => {
    const sortedData = sheetGroups[category].sort((a, b) => {
      if (a.PatientName && b.PatientName) {
        return a.PatientName.localeCompare(b.PatientName);
      }
      return 0;
    });

    return {
      title: category,
      key: 'sheet' + index,
      data: sortedData,
    };
  });

    // Initialize the table with the first sheet's data
    initializeTable(sheets[0].data);

    // Setup the tab navigation
    setupTabs();
}
// Create Excel Formula // 
function ageIfFormula(rowNumber) {
  return `=DATEDIF(C${rowNumber},TODAY(),"y")`;
}

// Function to initialize Tabulator
function initializeTable(data) {
    table = new Tabulator("#example-table", {
        height: "311px",
        layout: "fitDataFill",
        spreadsheetOutputFull: true,
        columns: [
            { title: "Patient", field: "PatientName" },
            { title: "Patient DOB", field: "PatBirthDate" },
           // { title: "Patient Age", field: "Patient Age" },
            { title: "Lot Number", field: "LotNumber" },
            { title: "Which Arm?", field: "WhichArm?" },
            { title: "Vaccinator", field: "Vaccinator" },
            { title: "Paperwork", field: "PaperWork" },
            
            // Define other columns based on your data
        ],
        data: data,
    });
}

// Function to setup tabs
function setupTabs() {
    var tabList = document.getElementById('tab-list');
    tabList.innerHTML = ''; // Clear previous tabs

    sheets.forEach((sheet, index) => {
        FacTitles.push(sheet.title);
        var tabButton = document.createElement('button');
        tabButton.innerHTML = sheet.title;
        tabButton.addEventListener('click', () => {
            table.setData(sheet.data);
        });
        tabList.appendChild(tabButton);
    });
    document.getElementById("download-xlsx").addEventListener("click", function() {
    // Prepare the sheets data in the required format
    var sheetData = sheets.map(sheet => ({
        
        name: sheet.title,
         // Sheet name
        data: sheet.data // Data for the sheet
        
    }));
    
  
  
}); 
 
}
  document.getElementById("download-xlsx").addEventListener("click", function() {
        // Prepare the workbook
        var wb = XLSX.utils.book_new();
 // Function to remove specific fields from each data entry
    function removeFields(data, fieldsToRemove) {
        return data.map(item => {
            let filteredItem = { ...item }; // Clone item to avoid mutating original data
            fieldsToRemove.forEach(field => delete filteredItem[field]);
            return filteredItem;
        });
    }

     const columnsToInclude = ['PatientName', 'PatBirthDate', 'LotNumber', 'Vaccinator', 'WhichArm?', 'PaperWork'];

    // Function to filter data and include only specified fields
    function filterFields(data, fieldsToInclude) {
        return data.map(item => {
            let filteredItem = {}; // Create a new object for the filtered data
            fieldsToInclude.forEach(field => {
                if (item.hasOwnProperty(field)) {
                    filteredItem[field] = item[field]; // Add only the specified fields to the new object
                }
            });
            return filteredItem;
        });
    }

    // Define the fields you want to exclude
    const fieldsToExclude = ['PharmacyLocation'];

    // Add each sheet to the workbook
   sheets.forEach(sheet => {
        // Filter the data to include only the specified columns
        var filteredData = filterFields(sheet.data, columnsToInclude);
        var ws = XLSX.utils.json_to_sheet(filteredData);
        XLSX.utils.book_append_sheet(wb, ws, sheet.title);
    });

        // Export the workbook
        XLSX.writeFile(wb, "MultipleSheets.xlsx");
    });





/*
console.log("FacTitles",FacTitles);
document.getElementById("download-xlsx").addEventListener("click", function(){
    table.download("xlsx", "data.xlsx", {sheetName:sheets.FacTitles});
});
*/
//console.log("table: ",table);
/*
document.getElementById("download-xlsx").addEventListener("click", function(){
    // table.download("xlsx", "data.xlsx", {sheetName:"My Data"});
    table.download("xlsx", "data.xlsx", {sheets:sheets.title}); //download a Xlsx file that has a tab for each table
});
*/
// Fetch the data and call handleResult
//domo.get(query2).then(handleResult);



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
