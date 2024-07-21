function addRow() {
    var name = document.getElementById("name").value;
    var judulbuku = document.getElementById("judulbuku").value;
    var tglpeminjaman = document.getElementById("tglpeminjaman").value;
    var tglpengembalian = document.getElementById("tglpengembalian").value;
    var petugas = document.getElementById("petugas").value;

    if (name && judulbuku && tglpeminjaman) {
        var jsonData = {
            ref: '',
            borrowtime: new Date(tglpeminjaman),
            returntime: new Date(tglpengembalian),
            personid: Number(name),
            bookid: Number(judulbuku),
            employee: petugas,
            status: 1
        }

        fetch('http://localhost:1000/transaction/saveorupdate?operation=c',
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
                data.forEach(item => {
                    var newRow = table.insertRow(table.rows.length);
    
                    var cell1 = newRow.insertCell(0);
                    var cell2 = newRow.insertCell(1);
                    var cell3 = newRow.insertCell(2);
                    var cell4 = newRow.insertCell(3);
                    var cell5 = newRow.insertCell(4);
                    var cell6 = newRow.insertCell(5);
                    var cell7 = newRow.insertCell(6);
                    var cell8 = newRow.insertCell(7);
    
                    cell1.innerHTML = item.ref;
                    cell2.innerHTML = item.name;
                    cell3.innerHTML = item.nim;
                    cell4.innerHTML = item.title;
                    cell5.innerHTML = item.borrowtime;
                    cell6.innerHTML = item.returntime;
                    cell7.innerHTML = item.employee;
                    cell8.innerHTML = item.status;

                })

                document.getElementById('response').innerHTML = `<p>Succses</p>`;
            })
            .catch(error => document.getElementById('response').innerHTML = `<p>There was an error!</p>`);

        document.getElementById("form-data").reset();

    } else {
        alert("Harap lengkapi semua kolom");
    }
}


/*DROPDOWN BUKU*/
document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:1000/transaction?status=0')
        .then(response => response.json())
        .then(data => {
            var table = document.getElementById("result-data").getElementsByTagName('tbody')[0];
            table.innerHTML = '';
            data.forEach(item => {
                var newRow = table.insertRow(table.rows.length);

                var cell1 = newRow.insertCell(0);
                var cell2 = newRow.insertCell(1);
                var cell3 = newRow.insertCell(2);
                var cell4 = newRow.insertCell(3);
                var cell5 = newRow.insertCell(4);
                var cell6 = newRow.insertCell(5);
                var cell7 = newRow.insertCell(6);
                var cell8 = newRow.insertCell(7);

                cell1.innerHTML = item.ref;
                cell2.innerHTML = item.name;
                cell3.innerHTML = item.nim;
                cell4.innerHTML = item.title;
                cell5.innerHTML = item.borrowtime;
                cell6.innerHTML = item.returntime;
                cell7.innerHTML = item.employee;
                cell8.innerHTML = item.status;


            })
        })
        .catch(error => console.error('Error:', error))

    fetch('http://localhost:1000/book')
        .then(response => response.json())
        .then(data => {
            $('#judulbuku').select2({
                placeholder: 'cari buku',
                allowClear: true,
                data: data.map((item) => ({
                    id: item.id,
                    text: item.title
                })),
            });
        })
        .catch(error => console.error('Error:', error))

    fetch('http://localhost:1000/person')
        .then(response => response.json())
        .then(data => {
            $('#name').select2({
                placeholder: 'cari anggota',
                allowClear: true,
                data: data.map((item) => ({
                    id: item.id,
                    text: item.nim + ' - ' + item.name
                })),
            });
        })
        .catch(error => console.error('Error:', error))
})

