function addRow() {
  var inputname = document.getElementById("name").value;
  var inputnim = document.getElementById("nim").value;  
    fetch('http://localhost:1000/transaction?nim=' + inputnim + '&name=' + inputname )
    .then(response => response.json())
    .then(data => {
      var table = document.getElementById("result-data").getElementsByTagName('tbody')[0];
      table.innerHTML = '';
      data.forEach (item => {
        var newRow = table.insertRow(table.rows.length);
console.log(item);
        var cell1 = newRow.insertCell(0);
        var cell2 = newRow.insertCell(1);
        var cell3 = newRow.insertCell(2);
        var cell4 = newRow.insertCell(3);
        var cell5 = newRow.insertCell(4);
        var cell6 = newRow.insertCell(5);
        var cell7 = newRow.insertCell(6);
        var cell8 = newRow.insertCell(7);
        var cell9 = newRow.insertCell(8);

        cell1.innerHTML = item.ref;
        cell2.innerHTML = item.name;
        cell3.innerHTML = item.nim;
        cell4.innerHTML = '<img src="' + item.image + '"alt="foto">';
        cell5.innerHTML = item.title;
        cell6.innerHTML = item.borrowtime;
        cell7.innerHTML = item.returntime;
        cell8.innerHTML = item.employee;
        var temp = item;
        delete temp.image
        cell9.innerHTML = '<button type="button" onclick="updateData(this)" data-item=\'' + JSON.stringify(item) + '\' id="btn-update">Update</button>';
      })
      })
      .catch(error => console.error('Error:', error))
    
}

function updateData(item) {
  
  var inputname = document.getElementById("name").value;
  var inputnim = document.getElementById("nim").value;  
  
  var jsonData = JSON.parse(item.getAttribute('data-item'));
  console.log(inputname,inputnim, " HUAUAUAUA")

  fetch('http://localhost:1000/transaction/saveorupdate?operation=u&nama='+inputname+'&nim='+inputnim+'&status=0',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data, "HAHAHA")
        var table = document.getElementById("result-data").getElementsByTagName('tbody')[0];
        table.innerHTML = '';
        data.forEach (item => {
          var newRow = table.insertRow(table.rows.length);
  
          var cell1 = newRow.insertCell(0);
          var cell2 = newRow.insertCell(1);
          var cell3 = newRow.insertCell(2);
          var cell4 = newRow.insertCell(3);
          var cell5 = newRow.insertCell(4);
          var cell6 = newRow.insertCell(5);
          var cell7 = newRow.insertCell(6);
          var cell8 = newRow.insertCell(7);
          var cell9 = newRow.insertCell(8);
  
          cell1.innerHTML = item.ref;
          cell2.innerHTML = item.name;
          cell3.innerHTML = item.nim;
          cell4.innerHTML = '<img src="' + item.image + '"alt="foto">';
          cell5.innerHTML = item.title;
          cell6.innerHTML = item.borrowtime;
          cell7.innerHTML = item.returntime;
          cell8.innerHTML = item.employee;
          var temp = item;
          delete temp.image
          cell9.innerHTML = '<button type="button" onclick="updateData(this)" data-item=\'' + JSON.stringify(item) + '\' id="btn-update">Update</button>';
        
        })
    })
    .catch(error => {});

  

}