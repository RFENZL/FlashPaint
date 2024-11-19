const makeAppointment = async (artistId) => {
    fetch('http://localhost:3000/newAppointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          artistId: artistId,
          userId: localStorage.getItem('user'),
        
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

export default makeAppointment;