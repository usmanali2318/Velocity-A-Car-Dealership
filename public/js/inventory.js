let currentFilters = {
    category: new URLSearchParams(window.location.search).get('category') || undefined,
    color: undefined,
    maxPrice: 200000000,
    sort: 'price_desc'
};

const categories = ["Sedan", "SUV", "Pickup", "Luxury"];
const colors = ["Black", "White", "Silver", "Red", "Blue", "Grey"];

function renderFilters() {
    const priceSlider = document.getElementById('price-slider');
    const priceValue = document.getElementById('price-value');
    if (priceSlider && priceValue) {
        priceSlider.value = currentFilters.maxPrice;
        priceValue.innerText = `PKR ${(currentFilters.maxPrice / 1000000).toFixed(0)}M`;
    }
    const catContainer = document.getElementById('category-filters');
    if (catContainer) {
        catContainer.innerHTML = `
            <div onclick="updateCategory(undefined)" style="cursor: pointer; font-size: 0.875rem; color: ${!currentFilters.category ? 'hsl(var(--accent))' : 'white'}; display: flex; align-items: center; gap: 0.5rem;">
                <div style="width: 1rem; height: 1rem; border-radius: 50%; border: 1px solid ${!currentFilters.category ? 'hsl(var(--accent))' : 'rgba(255,255,255,0.2)'}; display: flex; align-items: center; justify-content: center;">
                    ${!currentFilters.category ? '<div style="width: 0.5rem; height: 0.5rem; background: hsl(var(--accent)); border-radius: 50%;"></div>' : ''}
                </div>
                All Vehicles
            </div>
            ${categories.map(cat => `
                <div onclick="updateCategory('${cat}')" style="cursor: pointer; font-size: 0.875rem; color: ${currentFilters.category === cat ? 'hsl(var(--accent))' : 'white'}; display: flex; align-items: center; gap: 0.5rem;">
                    <div style="width: 1rem; height: 1rem; border-radius: 50%; border: 1px solid ${currentFilters.category === cat ? 'hsl(var(--accent))' : 'rgba(255,255,255,0.2)'}; display: flex; align-items: center; justify-content: center;">
                        ${currentFilters.category === cat ? '<div style="width: 0.5rem; height: 0.5rem; background: hsl(var(--accent)); border-radius: 50%;"></div>' : ''}
                    </div>
                    ${cat}
                </div>
            `).join('')}
        `;
    }

    const colorContainer = document.getElementById('color-filters');
    if (colorContainer) {
        colorContainer.innerHTML = colors.map(color => `
            <div onclick="updateColor('${color}')" style="cursor: pointer; border: 1px solid ${currentFilters.color === color ? 'white' : 'rgba(255,255,255,0.1)'}; background: ${currentFilters.color === color ? 'white' : 'transparent'}; color: ${currentFilters.color === color ? 'black' : '#a1a1aa'}; text-align: center; padding: 0.5rem; font-size: 0.75rem; border-radius: 0.125rem; transition: all 0.2s;">${color}</div>
        `).join('');
    }
}

async function loadInventory() {
    const params = new URLSearchParams();
    if (currentFilters.category) params.append('category', currentFilters.category);
    if (currentFilters.color) params.append('color', currentFilters.color);
    if (currentFilters.maxPrice) params.append('maxPrice', currentFilters.maxPrice);
    params.append('sort', currentFilters.sort);

    const res = await fetch('/api/cars?' + params.toString());
    const cars = await res.json();
    
    const countEl = document.getElementById('results-count');
    if (countEl) countEl.innerText = `${cars.length} Vehicles Found`;
    
    const grid = document.getElementById('inventory-grid');
    if (grid) {
        grid.innerHTML = cars.map(car => `
            <div class="card">
                <a href="/car-details.html?id=${car.id}" style="display: block; position: relative; aspect-ratio: 16/10; overflow: hidden; background: #27272a;">
                    <img src="/images/cars/${car.image}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.7s; filter: brightness(0.9);" onmouseover="this.style.transform='scale(1.05)'; this.style.filter='brightness(1)'" onmouseout="this.style.transform='scale(1)'; this.style.filter='brightness(0.9)'">
                    <div style="position: absolute; top: 1rem; right: 1rem;">
                        <span class="badge" style="background: ${car.quantity > 0 ? 'rgba(0,0,0,0.5)' : 'rgba(239, 68, 68, 0.5)'}">${car.quantity > 0 ? 'Available' : 'Sold Out'}</span>
                    </div>
                    <div style="position: absolute; bottom: 0; left: 0; right: 0; padding: 1rem; background: linear-gradient(to top, rgba(0,0,0,0.9), transparent); display: flex; align-items: flex-end; justify-content: space-between;">
                         <span style="color: white; font-family: var(--font-display); font-size: 1.125rem; font-weight: 700;">${car.category}</span>
                    </div>
                </a>
                <div style="padding: 1.5rem;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                        <div>
                            <h3 style="font-size: 1.125rem; font-weight: 700; color: white; text-transform: uppercase;">${car.name}</h3>
                            <p style="color: #a1a1aa; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em;">${car.model}</p>
                        </div>
                        <span style="font-weight: 700; font-size: 1rem; color: white;">PKR ${car.price.toLocaleString()}</span>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; padding: 1rem 0; border-top: 1px solid rgba(255,255,255,0.05); margin-bottom: 1rem; text-align: center;">
                        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.25rem;">
                            <span style="font-size: 10px; color: #a1a1aa; text-transform: uppercase;">Gasoline</span>
                        </div>
                        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.25rem;">
                            <span style="font-size: 10px; color: #a1a1aa; text-transform: uppercase;">Automatic</span>
                        </div>
                        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.25rem;">
                            <span style="font-size: 10px; color: #a1a1aa; text-transform: uppercase;">Leather</span>
                        </div>
                    </div>

                    <a href="/car-details.html?id=${car.id}" class="btn" style="width: 100%; background: rgba(255,255,255,0.05); color: white; text-decoration: none; border: 1px solid transparent; transition: all 0.3s;" onmouseover="this.style.background='white'; this.style.color='black'" onmouseout="this.style.background='rgba(255,255,255,0.05)'; this.style.color='white'">View Details &rarr;</a>
                </div>
            </div>
        `).join('');
    }
}

window.updateCategory = (cat) => {
    currentFilters.category = cat;
    renderFilters();
    loadInventory();
};

window.updateColor = (color) => {
    currentFilters.color = currentFilters.color === color ? undefined : color;
    renderFilters();
    loadInventory();
};

window.updateSort = (sort) => {
    currentFilters.sort = sort;
    loadInventory();
};

window.updatePrice = (price) => {
    currentFilters.maxPrice = parseInt(price);
    const priceValue = document.getElementById('price-value');
    if (priceValue) {
        priceValue.innerText = `PKR ${(currentFilters.maxPrice / 1000000).toFixed(0)}M`;
    }
    // Debounce inventory loading
    if (window.priceTimeout) clearTimeout(window.priceTimeout);
    window.priceTimeout = setTimeout(() => {
        loadInventory();
    }, 300);
};

window.resetFilters = () => {
    currentFilters = { category: undefined, color: undefined, maxPrice: 200000000, sort: 'price_desc' };
    renderFilters();
    loadInventory();
};

renderFilters();
loadInventory();