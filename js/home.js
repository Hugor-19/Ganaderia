// Configuración de Vuex
const store = new Vuex.Store({
    state: {
        cart: []
    },
    mutations: {
        ADD_TO_CART(state, product) {
            const existingProduct = state.cart.find(item => item.id === product.id);
            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                state.cart.push({ ...product, quantity: 1 });
            }
        },
        REMOVE_FROM_CART(state, product) {
            const index = state.cart.findIndex(item => item.id === product.id);
            if (index !== -1) {
                if (state.cart[index].quantity > 1) {
                    state.cart[index].quantity--;
                } else {
                    state.cart.splice(index, 1);
                }
            }
        },
        INCREASE_QUANTITY(state, product) {
            const item = state.cart.find(item => item.id === product.id);
            if (item) {
                item.quantity++;
            }
        },
        DECREASE_QUANTITY(state, product) {
            const item = state.cart.find(item => item.id === product.id);
            if (item && item.quantity > 1) {
                item.quantity--;
            }
        },
        CLEAR_CART(state) {
            // Vaciar el carrito
            state.cart = [];
        },
        SAVE_CART_TO_STORAGE(state) {
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
    },
    getters: {
        cart: state => state.cart,
        cartTotalItems: state => state.cart.reduce((total, product) => total + product.quantity, 0),
        cartTotal: state => state.cart.reduce((total, product) => total + (product.price * product.quantity), 0)
    }
});

// Instancia Vue
new Vue({
    el: '#app',
    store,
    data() {
        return {
            showCart: false,
            searchQuery: '',
            currentSection: 'inicio',
            loginText: localStorage.getItem("isLoggedIn") ? "Cerrar Sesión" : "Iniciar Sesión",
            apiUrl: "http://localhost:5000/products",
            contactForm: {
                name: '',
                email: '',
                message: ''
            },

            products: [
                { id: 1, name: 'Toro', price: 10.00, description: 'Simmental', image: 'img/work1.jpg' },
                { id: 2, name: 'Vaca', price: 20.00, description: 'Simmental', image: 'img/work2.jpg' },
                { id: 3, name: 'Ternero', price: 30.00, description: 'Simmental', image: 'img/work3.jpg' },
                { id: 4, name: 'Ternera', price: 40.00, description: 'Simmental', image: 'img/work4.jpg' },
                { id: 5, name: 'Novillas', price: 50.00, description: 'Simmental', image: 'img/work5.jpg' },
                { id: 6, name: 'Novillos', price: 50.00, description: 'Simmental', image: 'img/work6.jpg' },
                { id: 7, name: 'Vaca', price: 40.00, description: 'Simmental', image: 'img/work7.jpg' },
                { id: 8, name: 'Novillas', price: 30.00, description: 'Simmental', image: 'img/work8.jpg' },
            ]
        };
    },
    computed: {
        cart() {
            return this.$store.getters.cart;
        },
        cartTotalItems() {
            return this.$store.getters.cartTotalItems;
        },
        totalCart() {
            return this.$store.getters.cartTotal;
        },
        filteredProducts() {
            const query = this.searchQuery.trim().toLowerCase();
            return this.products.filter(product =>
                product.name.toLowerCase().includes(query) ||
                product.description.toLowerCase().includes(query)
            );
        }
    },
    methods: {
        toggleLogin() {
            if (this.loginText === "Cerrar Sesión") {
                localStorage.removeItem("isLoggedIn");
                this.loginText = "Iniciar Sesión";
            } else {
                window.location.href = "login.html";
            }
        },
        toggleCart() {
            this.showCart = !this.showCart;
        },
        addToCart(product) {
            this.$store.commit('ADD_TO_CART', product);
        },
        removeFromCart(product) {
            this.$store.commit('REMOVE_FROM_CART', product);
        },
        increaseQuantity(product) {
            this.$store.commit('INCREASE_QUANTITY', product);
        },
        decreaseQuantity(product) {
            this.$store.commit('DECREASE_QUANTITY', product);
        },
        clearCart() {
            this.$store.commit('CLEAR_CART');
        },
        navigate(section) {
            this.currentSection = section;
        },
        submitContactForm() {
            alert(`Gracias, ${this.contactForm.name}. Hemos recibido tu mensaje.`);
            this.contactForm.name = '';
            this.contactForm.email = '';
            this.contactForm.message = '';
        },
        proceedToCheckout() {
            // Redirigir al formulario de compra (checkout)
            this.$store.commit('SAVE_CART_TO_STORAGE');
            window.location.href = '/checkout.html'; // Asegúrate de tener la página '/checkout.html'
        },

    }
});
