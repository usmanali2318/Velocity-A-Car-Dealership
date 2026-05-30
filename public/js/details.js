async function loadDetails() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (!id) return;

    const res = await fetch(`/api/cars/${id}`);
    const car = await res.json();
    
    const container = document.getElementById('car-details');
    let displayImage = car.image;

    function render() {
        container.innerHTML = `
            <div style="display: grid; grid-template-columns: 1fr; gap: 3rem;" class="lg:grid-cols-2">
                <!-- Image Gallery -->
                <div style="display: flex; flex-direction: column; gap: 1rem;">
                    <div style="aspect-ratio: 16/10; overflow: hidden; border-radius: 0.125rem; background: hsl(var(--muted)); border: 1px solid rgba(255,255,255,0.1);">
                        <img src="/images/cars/${displayImage}" style="width: 100%; height: 100%; object-fit: cover;">
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
                        <div class="thumb" onclick="updateImage('${car.image}')" style="aspect-ratio: 16/9; overflow: hidden; border-radius: 0.125rem; border: 1px solid ${displayImage === car.image ? 'hsl(var(--accent))' : 'rgba(255,255,255,0.1)'}; opacity: ${displayImage === car.image ? '1' : '0.6'}; transition: all 0.3s;">
                            <img src="/images/cars/${car.image}" style="width: 100%; height: 100%; object-fit: cover;">
                        </div>
                        ${car.interiorImage ? `
                            <div class="thumb" onclick="updateImage('${car.interiorImage}')" style="aspect-ratio: 16/9; overflow: hidden; border-radius: 0.125rem; position: relative; border: 1px solid ${displayImage === car.interiorImage ? 'hsl(var(--accent))' : 'rgba(255,255,255,0.1)'}; opacity: ${displayImage === car.interiorImage ? '1' : '0.6'}; transition: all 0.3s;">
                                <img src="/images/cars/${car.interiorImage}" style="width: 100%; height: 100%; object-fit: cover;">
                                <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center;">
                                    <span style="font-size: 10px; font-weight: 700; text-transform: uppercase;">Interior</span>
                                </div>
                            </div>
                        ` : ''}
                        ${car.detailImage ? `
                            <div class="thumb" onclick="updateImage('${car.detailImage}')" style="aspect-ratio: 16/9; overflow: hidden; border-radius: 0.125rem; position: relative; border: 1px solid ${displayImage === car.detailImage ? 'hsl(var(--accent))' : 'rgba(255,255,255,0.1)'}; opacity: ${displayImage === car.detailImage ? '1' : '0.6'}; transition: all 0.3s;">
                                <img src="/images/cars/${car.detailImage}" style="width: 100%; height: 100%; object-fit: cover;">
                                <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center;">
                                    <span style="font-size: 10px; font-weight: 700; text-transform: uppercase;">Detail</span>
                                </div>
                            </div>
                        ` : ''}
                    </div>
                </div>

                <!-- Details -->
                <div>
                    <div style="color: hsl(var(--accent)); font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; font-size: 0.875rem; margin-bottom: 0.5rem;">${car.category}</div>
                    <h1 style="font-size: 2.25rem; font-weight: 700; color: white; margin-bottom: 0.5rem;">${car.name}</h1>
                    <h2 style="font-size: 1.5rem; color: hsl(var(--muted-foreground)); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 1.5rem;">${car.model}</h2>
                    
                    <div style="display: flex; align-items: flex-end; gap: 1rem; margin-bottom: 2rem; padding-bottom: 2rem; border-bottom: 1px solid rgba(255,255,255,0.1);">
                        <span style="font-size: 2.25rem; font-weight: 700; color: white;">PKR ${car.price.toLocaleString()}</span>
                        ${car.quantity <= 0 ? '<span style="color: hsl(var(--destructive)); font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.5rem;">Sold Out</span>' : ''}
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2rem;">
                        <div style="display: flex; align-items: center; gap: 0.75rem;">
                            <div style="padding: 0.5rem; background: rgba(255,255,255,0.05); border-radius: 0.125rem; color: hsl(var(--accent)); display: flex; align-items: center; justify-content: center;">⛽</div>
                            <div>
                                <span style="display: block; font-size: 10px; color: hsl(var(--muted-foreground)); text-transform: uppercase;">Fuel Type</span>
                                <span style="color: white; font-weight: 500;">Gasoline</span>
                            </div>
                        </div>
                        <div style="display: flex; align-items: center; gap: 0.75rem;">
                            <div style="padding: 0.5rem; background: rgba(255,255,255,0.05); border-radius: 0.125rem; color: hsl(var(--accent)); display: flex; align-items: center; justify-content: center;">🏎️</div>
                            <div>
                                <span style="display: block; font-size: 10px; color: hsl(var(--muted-foreground)); text-transform: uppercase;">Mileage</span>
                                <span style="color: white; font-weight: 500;">0 mi (New)</span>
                            </div>
                        </div>
                    </div>

                    <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 0.125rem; margin-bottom: 2rem;">
                        <h3 style="font-weight: 700; font-size: 1.125rem; color: white; margin-bottom: 1rem; text-transform: uppercase;">Vehicle Highlights</h3>
                        <ul style="display: grid; grid-template-columns: 1fr; gap: 0.75rem; list-style: none; padding: 0; margin: 0;" class="md:grid-cols-2">
                            <li style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; color: #d1d5db;">✔️ Panoramic Sunroof</li>
                            <li style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; color: #d1d5db;">✔️ Premium Sound System</li>
                            <li style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; color: #d1d5db;">✔️ Navigation System</li>
                            <li style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; color: #d1d5db;">✔️ Wireless Charging</li>
                        </ul>
                    </div>

                    <button onclick="openModal()" class="btn btn-primary" style="width: 100%; height: 3.5rem; font-size: 1rem; font-weight: 700; border-radius: 0.125rem;" ${car.quantity <= 0 ? 'disabled' : ''}>
                        ${car.quantity > 0 ? 'Reserve This Vehicle' : 'Vehicle Unavailable'}
                    </button>
                </div>
            </div>
        `;
    }

    window.openModal = () => {
        const userStr = localStorage.getItem('user');
        if (!userStr) {
            alert('Please login to reserve a vehicle.');
            window.location.href = 'auth.html';
            return;
        }
        
        const amountDisplay = document.getElementById('reservation-amount-display');
        const resAmount = Math.floor(car.price * 0.5);
        amountDisplay.innerText = `PKR ${resAmount.toLocaleString()}`;
        document.getElementById('reservation-modal').dataset.resAmount = resAmount;
        
        // Auto-fill card details if available
        const user = JSON.parse(userStr);
        if (user.cardNumber) {
            const form = document.getElementById('reservation-form');
            form.querySelector('[name="cardNumber"]').value = user.cardNumber;
            form.querySelector('[name="expiryDate"]').value = user.expiryDate || '';
            form.querySelector('[name="cvv"]').value = user.cvv || '';
        }

        document.getElementById('reservation-modal').style.display = 'flex';
        document.body.style.overflow = 'hidden';
    };

    window.closeModal = () => {
        document.getElementById('reservation-modal').style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    window.handleReservation = async (e) => {
        e.preventDefault();
        const userStr = localStorage.getItem('user');
        if (!userStr) {
            alert('Please login to reserve a vehicle.');
            window.location.href = 'auth.html';
            return;
        }
        const user = JSON.parse(userStr);

        const submitBtn = document.getElementById('submit-btn');
        const formData = new FormData(e.target);
        const modal = document.getElementById('reservation-modal');
        
        const data = {
            carId: parseInt(id),
            customerName: user.fullName,
            customerPhone: user.phone || '000-000-0000',
            customerEmail: user.email,
            quantity: 1,
            reservationAmount: parseInt(modal.dataset.resAmount),
            cardNumber: formData.get('cardNumber'),
            expiryDate: formData.get('expiryDate'),
            cvv: formData.get('cvv'),
            userId: user.id
        };

        submitBtn.disabled = true;
        submitBtn.innerText = 'Processing...';

        try {
            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (res.ok) {
                alert('Reservation successful! We will contact you soon.');
                window.location.href = '/inventory.html';
            } else {
                const err = await res.json();
                alert('Reservation failed: ' + (err.message || 'Unknown error'));
            }
        } catch (err) {
            alert('An error occurred during reservation.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerText = 'Confirm Reservation';
        }
    };

    window.updateImage = (img) => {
        displayImage = img;
        render();
    };

    render();
}

loadDetails();