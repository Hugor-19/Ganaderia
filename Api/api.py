from flask import Flask, request, jsonify
import mysql.connector
 
from flask_cors import CORS
 
app = Flask(__name__)
CORS(app)
 
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="ganaderia"
)
 
cursor = db.cursor(dictionary=True)
 
#login
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
   
    print("Email recibido:", email)
    print("Password recibido:", password)
 
    if not email or not password:
        return jsonify({'message': 'Faltan datos del usuario'}), 400
 
    # Ejecuta la consulta para buscar el usuario
    cursor.execute("SELECT * FROM users WHERE email = %s AND password = %s", (email, password))
    user = cursor.fetchone()
 
    # Imprime el resultado de la consulta para depuración
    print("Resultado de la consulta:", user)
 
    if user:
        return jsonify({'message': 'Inicio de sesión exitoso', 'user': user}), 200
    else:
        return jsonify({'message': 'Credenciales incorrectas'}), 401
 
 # Registro en Flask
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    full_name = data.get('full_name')
    email = data.get('email')
    password = data.get('password')

    if not full_name or not email or not password:
        return jsonify({'message': 'Faltan datos para el registro'}), 400

    # Verificar si el usuario ya existe
    cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
    user = cursor.fetchone()

    if user:
        return jsonify({'message': 'El usuario ya está registrado'}), 409

    # Insertar el nuevo usuario en la base de datos
    cursor.execute("INSERT INTO users (full_name, email, password) VALUES (%s, %s, %s)", (full_name, email, password))
    db.commit()

    return jsonify({'message': 'Registro exitoso'}), 201

#  productos
@app.route('/products', methods=['GET'])
def get_products():
    cursor.execute("SELECT * FROM products")
    products = cursor.fetchall()
    return jsonify(products), 200
 
#  comprar
@app.route('/purchase', methods=['POST'])
def purchase():
    try:
        # Obtener los datos de la solicitud POST
        data = request.json
        name = data.get('name')
        email = data.get('email')
        address = data.get('address')
        payment_method = data.get('paymentMethod')
        cart = data.get('cart')

        # Validación de datos
        if not name or not email or not address or not cart:
            return jsonify({'message': 'Datos incompletos para realizar la compra'}), 400

        # Procesar cada producto del carrito y guardarlo en la base de datos
        for item in cart:
            cursor.execute('''
                INSERT INTO purchases (name, email, address, payment_method, product_id, quantity, total_price)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
            ''', (
                name, 
                email, 
                address, 
                payment_method, 
                item['id'], 
                item['quantity'], 
                item['price'] * item['quantity']
            ))

        # Confirmar cambios
        db.commit()

        return jsonify({'message': 'Compra realizada exitosamente'}), 201
    except Exception as e:  
        return jsonify({'error': str(e)}), 500
 
 
if __name__ == '__main__':
    app.run(debug=True)