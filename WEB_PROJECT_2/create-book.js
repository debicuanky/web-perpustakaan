function promiseCreateUpdate(operation, jsonData) {
    fetch('http://localhost:1000/book/saveorupdate?operation=' + operation,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        })
        .then(response => response.json())
        .then(data => {
            var table = document.getElementById("result-data").getElementsByTagName('tbody')[0];
            table.innerHTML = '';
            data.forEach(item => {
                var newRow = table.insertRow(table.rows.length)
                var cell1 = newRow.insertCell(0);
                var cell2 = newRow.insertCell(1);
                var cell3 = newRow.insertCell(2);
                var cell4 = newRow.insertCell(3);


                cell1.innerHTML = item.title;
                cell2.innerHTML = item.count;
                cell3.innerHTML = item.status;
                cell4.innerHTML = '<button type="button" onclick="getidData(this)" data-item=\'' + JSON.stringify(item) + '\' id="btn-update">Ubah</button>';

            })

            document.getElementById('response').innerHTML = `<p>Succses</p>`;
        })
        .catch(error => {
            document.getElementById('response').innerHTML = `<p>There was an error!</p>`
        });
}

function addRow(payload) {
    var name = document.getElementById("name").value;
    var jumlahbuku = document.getElementById("jumlah-buku").value;

    if (name && jumlahbuku) {
        var jsonData = {
            title: name,
            description: '',
            count: jumlahbuku,
            status: 1
        }
        console.log(payload, "ini payload");
        if (payload) {
            jsonData['id'] = payload.id
            promiseCreateUpdate('u', jsonData)
        } else {
            promiseCreateUpdate('c', jsonData)
        }
        document.getElementById("btntambah").onclick = () => addRow();
        document.getElementById("form-data").reset();

    } else alert("Isi dengan benar dan Upload Foto Anda")
}

document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:1000/book')
        .then(response => response.json())
        .then(data => {
            var table = document.getElementById("result-data").getElementsByTagName('tbody')[0];
            data.forEach(item => {
                var newRow = table.insertRow(table.rows.length)
                var cell1 = newRow.insertCell(0);
                var cell2 = newRow.insertCell(1);
                var cell3 = newRow.insertCell(2);
                var cell4 = newRow.insertCell(3);


                cell1.innerHTML = item.title;
                cell2.innerHTML = item.count;
                cell3.innerHTML = item.status;
                cell4.innerHTML = '<button type="button" onclick="getidData(this)" data-item=\'' + JSON.stringify(item) + '\' id="btn-update">Ubah</button>';

                console.log(newRow);
            })
        })
        .catch(error => console.error('Error:', error))

})

function getidData(item) {
    var jsonData = JSON.parse(item.getAttribute('data-item'));
    const name = document.getElementById("name");
    name.value = jsonData.title;
    const jumlahbuku = document.getElementById("jumlah-buku");
    jumlahbuku.value = jsonData.count;
    const btntambah = document.getElementById("btntambah")
    btntambah.onclick = () => addRow(jsonData);
}

function cetak() {
    fetch('http://localhost:1000/book')
        .then(response => response.json())
        .then(data => {
            var table = '';
            data.forEach(item => {
                table += `<tr>
                        <td>${item.title}</td>
                        <td>${item.count}</td>
                        <td>${item.status}</td
                    </tr>`;
            })

            var newWindow = window.open("", "");
            newWindow.document.write(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Cetak Tabel</title>
                    <style>
                        table { width: 100%; border-collapse: collapse; }
                        th, td { border: 1px solid black; padding: 8px; text-align: left; }
                        .form-result-th { background-color: #f2f2f2; }
                    </style>
                </head>
                <body>
                    <table>
                        <thead>
                            <tr>
                               <th class="form-result-th"> Judul Buku</th>
                               <th class="form-result-th">Jumlah Buku</th>
                               <th class="form-result-th">Status</th>
                            </tr>
                         </thead>
                        <tbody>
                            ${table}
                        </tbody>
                    </table>
                    <script>
                        window.onload = function() {
                            window.print();
                            window.onafterprint = function() {
                                window.close();
                            };
                        };
                    </script>
                </body>
                </html>
            `);
            newWindow.document.close();
        })
        .catch(error => console.error('Error:', error))
}