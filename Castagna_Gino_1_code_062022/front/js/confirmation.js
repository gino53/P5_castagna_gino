// Récupération du numéro de commande dans l'URL
const orderId = new URLSearchParams(document.location.search).get("orderId");

document.getElementById("orderId").textContent = orderId;