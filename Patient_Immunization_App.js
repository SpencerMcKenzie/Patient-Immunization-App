document.getElementById("download-xlsx").addEventListener("click", function() {
    var wb = XLSX.utils.book_new();
    const columnsToInclude = ['PatientName', 'PatBirthDate', 'LotNumber', 'Vaccinator', 'WhichArm?', 'PaperWork', 'Row'];

    function filterFields(data, fieldsToInclude) {
        return data.map((item, index) => {
            let filteredItem = {}; 
            fieldsToInclude.forEach(field => {
                if (item.hasOwnProperty(field)) {
                    filteredItem[field] = item[field]; 
                }
            });

            // Add the Excel formula for age calculation
            filteredItem['PatientAge'] = {
                f: `DATEDIF(C${index + 2},TODAY(),"y")` // Excel formula for age
            };

            return filteredItem;
        });
    }

    sheets.forEach(sheet => {
        var filteredData = filterFields(sheet.data, columnsToInclude);

        // Sort the filtered data by 'Row' in descending order
        filteredData.sort((a, b) => b.Row - a.Row);

        var ws = XLSX.utils.json_to_sheet(filteredData);
        XLSX.utils.book_append_sheet(wb, ws, sheet.title);
    });

    XLSX.writeFile(wb, "FilteredAndSortedData.xlsx");
});
