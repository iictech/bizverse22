export default async function displayRazorpay(){
    //POST request to Nodejs
    const data = await fetch("http://localhost:5000/razorpay",{
        method: 'POST'
    }).then((t)=> t.json())

    console.log(data)

    const options = {
        key: "rzp_live_u6DNFurSsXh9o3",
        currency: data.currency,
        amount: data.amount,
        description: 'Wallet Transaction',
        image: 'https://localhost:5000/logo.jpg',
        order_id: data.id,
        handler: function(response){
            alert("PAYMENT ID: " + response.razorpay_payment_id)
            alert("ORDER_ID: " + response.razorpay_order_id)
        },
        prefill: {
            name: 'PRIYASU GUIN',
            email: 'priyasuguin4@gmail.com',
            contact: '8697302960'
        }
    };

    const paymentObject = new window.Razorpay(options)

    paymentObject.open()
} 
