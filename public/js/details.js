async function loadDetails() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (!id) return;

    const res = await fetch(`/api/cars/${id}`);
    const car = await res.json();
    
    const container = document.getElementById('car-details');
    // Using main image as default display
    let displayImage = car.image;

    function render() {
        container.innerHTML = `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 48px;">
                <div>
                    <div style="margin-bottom: 16px;">
                        <img id="main-image" src="/images/cars/${displayImage}" style="width: 100%; aspect-ratio: 16/10; object-fit: cover; border-radius: 4px; border: 1px solid var(--border);">
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
                        <div class="thumb" onclick="updateImage('${car.image}')" style="cursor: pointer; opacity: ${displayImage === car.image ? '1' : '0.6'}; border: 1px solid ${displayImage === car.image ? 'var(--accent)' : 'var(--border)'}; border-radius: 4px; overflow: hidden;">
                            <img src="/images/cars/${car.image}" style="width: 100%; height: 60px; object-fit: cover;">
                        </div>
                        ${car.interiorImage ? `
                            <div class="thumb" onclick="updateImage('${car.interiorImage}')" style="cursor: pointer; opacity: ${displayImage === car.interiorImage ? '1' : '0.6'}; border: 1px solid ${displayImage === car.interiorImage ? 'var(--accent)' : 'var(--border)'}; border-radius: 4px; overflow: hidden; position: relative;">
                                <img src="/images/cars/${car.interiorImage}" style="width: 100%; height: 60px; object-fit: cover;">
                                <span style="position: absolute; bottom: 0; left: 0; right: 0; background: rgba(0,0,0,0.5); font-size: 8px; text-align: center; color: white;">INTERIOR</span>
                            </div>
                        ` : ''}
                        ${car.detailImage ? `
                            <div class="thumb" onclick="updateImage('${car.detailImage}')" style="cursor: pointer; opacity: ${displayImage === car.detailImage ? '1' : '0.6'}; border: 1px solid ${displayImage === car.detailImage ? 'var(--accent)' : 'var(--border)'}; border-radius: 4px; overflow: hidden; position: relative;">
                                <img src="/images/cars/${car.detailImage}" style="width: 100%; height: 60px; object-fit: cover;">
                                <span style="position: absolute; bottom: 0; left: 0; right: 0; background: rgba(0,0,0,0.5); font-size: 8px; text-align: center; color: white;">DETAIL</span>
                            </div>
                        ` : ''}
                    </div>
                </div>
                <div>
                    <p style="color: var(--accent); font-weight: bold; text-transform: uppercase; font-size: 12px; margin-bottom: 8px;">${car.category}</p>
                    <h1 style="margin-top: 0;">${car.name}</h1>
                    <h2 style="color: #888; margin-bottom: 32px;">${car.model}</h2>
                    <p style="font-size: 32px; font-weight: bold; margin-bottom: 32px;">PKR ${car.price.toLocaleString()}</p>
                    <button class="btn btn-primary" style="width: 100%; height: 56px;">Reserve Now</button>
                </div>
            </div>
        `;
    }

    window.updateImage = (img) => {
        displayImage = img;
        render();
    };

    render();
}

loadDetails();