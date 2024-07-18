

//import {TabulatorFull as Tabulator} from 'tabulator-tables';
// DDX Bricks Wiki - See https://developer.domo.com/docs/ddx-bricks/getting-started-using-ddx-bricks
// for tips on getting started, linking to Domo data and debugging your app
 
//Available globals
var domo = window.domo; // For more on domo.js: https://developer.domo.com/docs/dev-studio-guides/domo-js#domo.get
var datasets = window.datasets;
var sheetDef = [];

//Step 1. Select your dataset(s) from the button in the bottom left corner


console.log("Before GET");
//Step 2. Query your dataset(s): https://developer.domo.com/docs/dev-studio-references/data-api
var fields = ['PharmacyLocation','FacName','PharmID','PatientName','PatBirthDate'];
var groupby = ['PharmacyLocation','FacName','PharmID','PatientName','PatBirthDate'];
var query = `/data/v1/${datasets[0]}?fields=${fields.join()}&groupby=${groupby.join()}`;
domo.get(query).then(handleResult);



//Step 3. Do something with the data from the query result
function handleResult(data){
  console && console.log(data);

  var table = new Tabulator("#example-table", {
    height:"311px",

    spreadsheet:true,
    spreadsheetRows:10,
    spreadsheetColumns:10,
    spreadsheetColumnDefinition:{editor:"input"},
   // spreadsheetSheets:sheets,
   spreadsheetSheets:sheetDef,
    spreadsheetSheetTabs:true,
   //spreadsheetSheetTabsElement:"#table-tabs",
     /*
     spreadsheetSheets:[
        {
            title:"Sales Info",
            key:"info",
            columns:20,
            rows:20,
            data:[
                [9937,	"",	"",	7749,	9816,	4355,	8279,	"",	""],
                [2380,	"",	6977,	8896,	4012,	3803,	5408,	3415,	3056],
                [9180,	"",	39,	9445,	3917,	"",	18,	5239,	2516],
            ]
        },
        
    ],
*/

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
