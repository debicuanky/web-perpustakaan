/*ANGGOTA*/
document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:1000/person')
      .then(response => response.json())
      .then(data => {
        var anggota = document.getElementById("value-anggota")
        anggota.innerHTML = data.length;
        })
        .catch(error => console.error('Error:', error));
      })
      
/*BUKU*/
      document.addEventListener('DOMContentLoaded', function() {
        fetch('http://localhost:1000/book')
          .then(response => response.json())
          .then(data => {
            var buku = document.getElementById("value-buku")
            buku.innerHTML = data.length;
            })
            .catch(error => console.error('Error:', error));
          })


 /*PEMINJAMAN*/
          document.addEventListener('DOMContentLoaded', function() {
            fetch('http://localhost:1000/transaction?status=0')
              .then(response => response.json())
              .then(data => {
                var peminjaman = document.getElementById("value-peminjaman")
                peminjaman.innerHTML = data.length;
                })
                .catch(error => console.error('Error:', error));
              })
            
 /*PENGEMBALIAN*/
   document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:1000/transaction?status=1')
      .then(response => response.json())
      .then(data => {
        var pengembalian = document.getElementById("value-pengembalian")
        pengembalian.innerHTML = data.length;
        })
        .catch(error => console.error('Error:', error));
      })         
      
/*KALENDER*/

  $(document).ready(function() {
            $('#calendar').fullCalendar({
                header: {
                    left: 'prev,next',
                    center: 'title',
                    right: '' // Remove day and week view buttons
                },
                defaultView: 'month', // Ensure the calendar displays the month view
                defaultDate: moment().format('YYYY-MM-DD'),
                editable: false,
                events: [] // Empty events array to ensure no events are shown
            });
        });







       
   