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
                    payment_method_id: 'pix',
                    payer: { email: `${usuario}@ice.com` }
                })
            });

            const data = await response.json();
            
            // ESSA LINHA ABAIXO É A QUE RESOLVE O ERRO DO BANCO:
            if (data.point_of_interaction) {
                return res.status(200).json({ 
                    qr_code: data.point_of_interaction.transaction_data.qr_code 
                });
            } else {
                return res.status(400).json({ error: 'Erro ao gerar o código Pix' });
            }
            
        } catch (error) {
            return res.status(500).json({ error: 'Erro no servidor' });
        }
    }
}
