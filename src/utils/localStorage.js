export function initLocalStorage() {
  if (!localStorage.getItem('lamboe_wallet')) {
    localStorage.setItem('lamboe_wallet', '0');
  }
  if (!localStorage.getItem('lamboe_shipments')) {
    localStorage.setItem('lamboe_shipments', JSON.stringify([]));
  }
}

export function generateResi() {
  return 'LB' + Math.random().toString().slice(2, 10).padStart(8, '0');
}

export function createShipment(data) {
  const shipments = JSON.parse(localStorage.getItem('lamboe_shipments') || '[]');
  
  // ETA logic: 10 mins from now for demo purposes
  const now = new Date();
  const eta = new Date(now.getTime() + 10 * 60000); // 10 minutes demo

  const newShipment = {
    id: generateResi(),
    ...data, // sender, receiver, weight, type, price
    status: 'PICKUP_REQUESTED', //  PICKUP_REQUESTED, IN_TRANSIT, DELIVERED
    createdAt: now.toISOString(),
    eta: eta.toISOString(),
    deliveredAt: null,
    history: [
      { status: 'PICKUP_REQUESTED', time: now.toISOString(), location: data.senderCity }
    ],
    videoProof: false,
    smartContractActive: data.type === 'smart' // flag for auto refund
  };

  shipments.push(newShipment);
  localStorage.setItem('lamboe_shipments', JSON.stringify(shipments));
  return newShipment;
}

export function getShipments() {
  return JSON.parse(localStorage.getItem('lamboe_shipments') || '[]');
}

export function getShipmentByResi(resi) {
  const shipments = getShipments();
  return shipments.find(s => s.id === resi);
}

export function updateShipmentStatus(resi, newStatus, location) {
  const shipments = getShipments();
  const idx = shipments.findIndex(s => s.id === resi);
  if (idx > -1) {
    shipments[idx].status = newStatus;
    shipments[idx].history.push({
      status: newStatus,
      time: new Date().toISOString(),
      location
    });
    if (newStatus === 'DELIVERED') {
      shipments[idx].deliveredAt = new Date().toISOString();
      shipments[idx].videoProof = true;
      
      // Check Cashback Telat
      const eta = new Date(shipments[idx].eta);
      const delivered = new Date(shipments[idx].deliveredAt);
      if (delivered > eta) {
        // Late! Adding cashback
        addWalletBalance(shipments[idx].price * 0.5); // 50% cashback demo
        shipments[idx].history.push({
          status: 'CASHBACK_APPLIED',
          time: new Date().toISOString(),
          location: 'System'
        });
      }
    }
    localStorage.setItem('lamboe_shipments', JSON.stringify(shipments));
  }
}

export function getWalletBalance() {
  return parseInt(localStorage.getItem('lamboe_wallet') || '0', 10);
}

export function addWalletBalance(amount) {
  const current = getWalletBalance();
  localStorage.setItem('lamboe_wallet', (current + amount).toString());
}
