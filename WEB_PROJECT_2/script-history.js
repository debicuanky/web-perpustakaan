document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:1000/transaction?status=1')
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
                cell9.innerHTML = item.status;
            })
        })
        .catch(error => console.error('Error:', error))
})

function cetak() {
    fetch('http://localhost:1000/transaction?status=1')
        .then(response => response.json())
        .then(data => {
            var table = '';
            data.forEach(item => {
                table += `<tr>
                        <td>${item.ref}</td>
                        <td>${item.name}</td>
                        <td>${item.nim}</td>
                        <td><img src="${item.image}"alt="foto"></td>
                        <td>${item.title}</td>
                        <td>${item.borrowtime}</td>
                        <td>${item.returntime}</td>
                        <td>${item.employee}</td>
                        <td>${item.status}</td>
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
                                <th class="form-result-th"> No Reff</th>
                                <th class="form-result-th"> Nama Lengkap</th>
                                <th class="form-result-th">NIM</th>
                                <th class="form-result-th">Foto</th>
                                <th class="form-result-th">Judul Buku</th>
                                <th class="form-result-th">Tanggal Peminjaman</th>
                                <th class="form-result-th">Tanggal Pengembalian</th>
                                <th class="form-result-th">Nama Petugas</th>
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