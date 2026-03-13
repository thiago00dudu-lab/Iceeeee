export default async function handler(req, res) {
    const token = process.env.MERCADO_PAGO_ACCESS_TOKEN;

    if (req.method === 'POST') {
        const { valor, usuario } = req.body;
        
        try {
            const response = await fetch('https://api.mercadopago.com/v1/payments', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'X-Idempotency-Key': Math.random().toString(36)
                },
                body: JSON.stringify({
                    transaction_amount: parseFloat(valor),
                    description: `Deposito ICE - ${usuario}`,
                    payment_method_id: "pix",
                    payer: { 
                        email: "pagamento@ice.com",
                        first_name: usuario 
                    }
                })
            });

            const data = await response.json();
            res.setHeader('Content-Type', 'application/json');
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ error: 'Erro no servidor' });
        }
    } else {
        return res.status(405).json({ error: 'Metodo nao permitido' });
    }
}
