const { Table } = require("console-table-printer");

const p = new Table();

//add rows with color
p.addRow({ endpoint: 1, text: 'red wine please', value: 10.212 });
p.addRow({ endpoint: 2, text: 'green gemuse please', value: 20.0 });
p.addRows([
  //adding multiple rows are possible
  { endpoint: 3, text: 'gelb bananen bitte', value: 100 },
  { endpoint: 4, text: 'update is working', value: 300 },
]);

//print
p.printTable();