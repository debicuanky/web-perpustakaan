function promiseCreateUpdate(operation, jsonData) {
    fetch('http://localhost:1000/person/saveorupdate?operation=' + operation, {
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
                var cell5 = newRow.insertCell(4);
                var cell6 = newRow.insertCell(5);
                var cell7 = newRow.insertCell(6);


                cell1.innerHTML = item.name;
                cell2.innerHTML = item.nim;
                cell3.innerHTML = item.telephone;
                cell4.innerHTML = item.email;
                cell5.innerHTML = '<img src="' + item.image + '"alt="foto">';
                var temp = item;
                delete temp.image
                cell6.innerHTML = '<button type="button" onclick="getidData(this)" data-item=\'' + JSON.stringify(item) + '\' id="btn-update">Ubah</button>';
                cell7.innerHTML = '<button type="button" onclick="hapusData(this)" data-item=\'' + JSON.stringify(item) + '\' id="btn-update">Hapus</button>';
            })

            document.getElementById('response').innerHTML = `<p>Succses</p>`;
        })
        .catch(error => document.getElementById('response').innerHTML = `<p>There was an error!</p>`);
}

function addRow(payload) {
    var name = document.getElementById("name").value;
    var nim = document.getElementById("nim").value;
    var notlp = document.getElementById("notlp").value;
    var email = document.getElementById("email").value;
    var foto = document.getElementById("foto").files[0];

    if (name && nim && notlp && email) {
        var jsonData = {
            nim: nim,
            name: name,
            email: email,
            telephone: notlp,
            type: 2,
            status: 1
        }

        if (payload) {
            jsonData['id'] = payload?.id

            if (foto) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    jsonData['image'] = e.target.result
                    promiseCreateUpdate('u', jsonData)
                }
                reader.readAsDataURL(foto)
            } else {
                jsonData['image'] = payload?.image
                promiseCreateUpdate('u', jsonData)
            }

        } else {
            var reader = new FileReader();
            reader.onload = function (e) {
                jsonData['image'] = e.target.result
                promiseCreateUpdate('c', jsonData)
            }
            reader.readAsDataURL(foto)
        }
        document.getElementById("btnkirim").onclick = () => addRow();
        document.getElementById("show").src = "";
        document.getElementById("form-data").reset();
    } else alert("Form wajib di isi")
}

document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:1000/person')
        .then(response => response.json())
        .then(data => {
            var table = document.getElementById("result-data").getElementsByTagName('tbody')[0];
            data.forEach(item => {
                var newRow = table.insertRow(table.rows.length)
                var cell1 = newRow.insertCell(0);
                var cell2 = newRow.insertCell(1);
                var cell3 = newRow.insertCell(2);
                var cell4 = newRow.insertCell(3);
                var cell5 = newRow.insertCell(4);
                var cell6 = newRow.insertCell(5);
                var cell7 = newRow.insertCell(6);


                cell1.innerHTML = item.name;
                cell2.innerHTML = item.nim;
                cell3.innerHTML = item.telephone;
                cell4.innerHTML = item.email;
                cell5.innerHTML = '<img src="' + item.image + '"alt="foto">';
                var temp = item;
                delete temp.image
                cell6.innerHTML = '<button type="button" onclick="getidData(this)" data-item=\'' + JSON.stringify(item) + '\' id="btn-update">Ubah</button>';
                cell7.innerHTML = '<button type="button" onclick="hapusData(this)" data-item=\'' + JSON.stringify(item) + '\' id="btn-update">Hapus</button>';

            })
        })
        .catch(error => console.error('Error:', error))
})


function getidData(item) {
    var jsonData = JSON.parse(item.getAttribute('data-item'));
    fetch('http://localhost:1000/person?id=' + jsonData?.id)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const temp = data[0];
            const name = document.getElementById("name");
            name.value = temp.name;
            const nim = document.getElementById("nim");
            nim.value = temp.nim;
            const notlp = document.getElementById("notlp");
            notlp.value = temp.telephone;
            const email = document.getElementById("email");
            email.value = temp.email;
            const show = document.getElementById("show")
            show.src = temp.image;
            const btnkirim = document.getElementById("btnkirim")
            btnkirim.onclick = () => addRow(temp);
        })
        .catch(error => console.error('Error:', error))
}


//hapus data

function hapusData(item) {
    var jsonData = JSON.parse(item.getAttribute('data-item'));
    jsonData['status'] = 0;
    promiseCreateUpdate('u', jsonData)
}

function cetak() {
    fetch('http://localhost:1000/person')
        .then(response => response.json())
        .then(data => {
            var table = '';
            data.forEach(item => {
                table += `<tr>
                        <td>${item.name}</td>
                        <td>${item.nim}</td>
                        <td>${item.telephone}</td>                    
                        <td>${item.email}</td>
                        <td><img src="${item.image}"alt="foto"></td>                        
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
                               <th class="form-result-th"> Nama Lengkap</th>
                               <th class="form-result-th">NIM</th>
                               <th class="form-result-th">Nomor Telepon</th>
                               <th class="form-result-th">Email</th>
                               <th class="form-result-th">Foto</th>                              
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



























// console.log(document.getElementById('form-data'))
// document.getElementById('form-data').addEventListener('submit', function(event) {
// event.preventDefault();

// // Get mark from form
//     const name = document.getElementById('name').value;
//     const nim = document.getElementById('nim').value;
//     const notlp = document.getElementById('notlp').value;
//     const email = document.getElementById('email').value;
//     const image = document.getElementById('image').files[0];

// // showing mark in result-data
//     document.getElementById('result-name').textContent = name;
//     document.getElementById('result-nim').textContent = nim;
//     document.getElementById('result-notlp').textContent = notlp;
//     document.getElementById('result-email').textContent = email;

// // showing picture
//     const resultImage = document.getElementById('result-foto');
//     const reader = new FileReader();
//     reader.onload = function(e) {
//         resultImage.src = e.target.result;
//     }
//     if (image) {
//         reader.readAsDataURL(image);
//     }
// })
