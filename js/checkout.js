new Vue({
    el: '#checkout',
    data() {
        return {
            formData: {
                name: '',
                email: '',
                address: '',
                paymentMethod: 'credit_card'
            },
            cart: JSON.parse(localStorage.getItem('cart') || '[]')
        };
    },
    computed: {
        cartTotal() {
            return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        }
    },
    methods: {
        async submitPurchase() {
            try {
                const response = await fetch('http://localhost:5000/purchase', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        ...this.formData,
                        cart: this.cart
                    })
                });

                if (response.ok) {
                    alert('¡Compra realizada con éxito!');
                    localStorage.removeItem('cart');
                    window.location.href = 'home.html';  // Redirigir a la página principal
                } else {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Error al procesar la compra');
                }
            } catch (error) {
                alert('Error al procesar la compra: ' + error.message);
            }
        }
    }
});
