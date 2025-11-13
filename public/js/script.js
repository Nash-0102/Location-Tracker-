const socket = io();





if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            socket.emit("send-location", { latitude, longitude });
        },
        (error) => console.error(error),
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        }
    );
}

const map = L.map("map").setView([0, 0], 16);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "Nashit map",
}).addTo(map);

const markers = {};
let firstTime = true;

socket.on("receive-location", (data) => {
    const { id, latitude, longitude } = data;

    if (firstTime) {
        map.setView([latitude, longitude]);
        firstTime = false;
    }

    if (markers[id]) {
        markers[id].setLatLng([latitude, longitude]);
    } else {
        markers[id] = L.marker([latitude, longitude]).addTo(map);
    }
});




socket.on("user-disconnected" , (id)=>{
    if(markers[id]){
        map.removeLayer(markers[id]);
        delete markers[id];
    }
})

//search box 

L.Control.geocoder().addTo(map);

document.getElementById("btn").addEventListener("click", () => {
    const place = document.getElementById("search").value;

    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${place}`)
        .then(res => res.json())
        .then(data => {
            if (data.length > 0) {
                const lat = data[0].lat;
                const lon = data[0].lon;

                map.setView([lat, lon], 16);

                L.marker([lat, lon]).addTo(map)
                    .bindPopup(place)
                    .openPopup();
            } else {
                alert("Place not found");
            }
        });
});

