// backend.js - Exemplo de backend com Node.js
const express = require('express');
const Merca<script>
// Inicializando o Mercado Pago com sua chave pública
const mp = new MercadoPago('YOUR_PUBLIC_KEY', {
    locale: 'pt-BR' // Define o idioma da interface
});

// Função que cria a preferência de pagamento no backend
function createPreference() {
    fetch('/create_preference', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            items: [
                {
                    title: 'Produto 1', // Nome do produto
                    unit_price: 200.00, // Preço do produto
                    quantity: 1
                }
            ]
        })
    })
    .then(response => response.json())
    .then(data => {
        const preference = data.preference_id;
        // Cria o botão de pagamento com a preferência gerada
        mp.checkout({
            preference: {
                id: preference
            }
        });
    })
    .catch(error => console.error('Erro ao criar a preferência:', error));
}

// Adiciona o evento ao botão de pagamento
document.getElementById('btn-pagar').addEventListener('click', function() {
    createPreference();
});
</script>doPago = require('mercadopago');
const app = express();

app.use(express.json());

// Configurar o Mercado Pago com sua chave privada
MercadoPago.configurations.setAccessToken('YOUR_ACCESS_TOKEN');

app.post('/create_preference', (req, res) => {
    const preference = {
        items: req.body.items,
    };

    MercadoPago.preferences.create(preference)
        .then(response => {
            res.json({ preference_id: response.body.id });
        })
        .catch(error => {
            console.error('Erro ao criar preferência:', error);
            res.status(500).send('Erro ao criar preferência');
        });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
