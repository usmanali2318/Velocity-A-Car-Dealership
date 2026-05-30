async function loadCars() {
    const res = await fetch('/api/cars');
    const cars = await res.json();
    const grid = document.getElementById('cars-grid');
    
    grid.innerHTML = cars.map(car => `
        <div class="card">
            <a href="/car-details.html?id=${car.id}">
                <img src="/images/cars/${car.image}" alt="${car.name}">
            </a>
            <div class="card-content">
                <h3>${car.name}</h3>
                <p>${car.model}</p>
                <p class="price">PKR ${car.price.toLocaleString()}</p>
                <a href="/car-details.html?id=${car.id}" class="btn btn-primary" style="padding: 8px 16px; font-size: 12px; margin-top: 10px;">Details</a>
            </div>
        </div>
    `).join('');
}

loadCars();