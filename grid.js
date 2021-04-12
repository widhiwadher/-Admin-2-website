var filterParams = {
  comparator: function (filterLocalDateAtMidnight, cellValue) {
    var dateAsString = cellValue;
    if (dateAsString == null) return -1;
    var dateParts = dateAsString.split('/');
    var cellDate = new Date(
      Number(dateParts[2]),
      Number(dateParts[1]) - 1,
      Number(dateParts[0])
    );

    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }

    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }

    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
  },
  browserDatePicker: true,
};

var gridOptions = {
  columnDefs: [
    { headerName: 'Athlete', field: 'athlete', filter: true, Sorting: true },
    { headerName: 'Sport', field: 'sport', width: 250, filter: true, Sorting: true },
    {
      headerName: 'Age', field: 'age', type: 'numberColumn', filter: true, Sorting: true,
      cellClassRules: {
        'rag-red': 'x < 18',
        'rag-amber': 'x >= 18 && x < 25',
        'rag-green': 'x >= 25',
      },
    },
    {
      headerName: 'Year', field: 'year', type: 'numberColumn', filter: true, Sorting: true, width: 220, cellRenderer: function name(params) {

        return 'Jan-01-' + params.value
      }
    },

    {
      headerName: 'Date', field: 'date', type: ['dateColumn', 'nonEditableColumn'], width: 220, filter: true, cellRenderer: function name(params) {
        var x = params.value.split('/');
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
        return x[0] + '-' + monthNames[parseInt(x[1] - 1)] + '-' + x[2]

      }
    }

  ],
  rowSelection: 'single',
  onSelectionChanged: onSelectionChanged,
  rowData: null,

};

function onSelectionChanged() {
  var selectedRows = gridOptions.api.getSelectedRows();
  document.getElementById("Age").value = selectedRows[0].age;
  document.getElementById("athlete").value = selectedRows[0].athlete;
  document.getElementById("Sport").value = selectedRows[0].sport;
  document.getElementById("Year").value = selectedRows[0].year;
  document.getElementById("Date").value = selectedRows[0].date;
}

function formateDate(e) {
  console.log(e);
}

function onSubmitClick(e) {
  let getProperty = {
    age: document.getElementById("Age").value,
    athlete: document.getElementById("athlete").value,
    sport: document.getElementById("Sport").value,
    year: document.getElementById("Year").value,
    date: document.getElementById("Date").value,

  }

  var allRows = [];
  gridOptions.api.forEachNode((rowNode,) => {

    allRows.push(rowNode.data);

  });
  allRows.push(getProperty);
  gridOptions.api.setRowData(allRows);
  return;
};

document.addEventListener('DOMContentLoaded', function () {
  var gridDiv = document.querySelector('#myGrid');
  new agGrid.Grid(gridDiv, gridOptions);

  // agGrid
  //   .simpleHttpRequest({
  //     url: 'https://www.ag-grid.com/example-assets/olympic-winners.json',
  //   })
  //   .then(function (data) {
  //     gridOptions.api.setRowData(data);

  //   });
});
