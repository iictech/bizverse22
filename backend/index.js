const app = require('express')()

const path = require('path')

const cors = require('cors')

const shortid = require('shortid')

const Razorpay = require('razorpay')

//Initialize razorpay credentials

const razorpay  =new Razorpay({
    key_id: "rzp_live_u6DNFurSsXh9o3",
    key_secret: "TL6rdyXdDyCMP6RmfB67xeUX",
});

app.use(cors())

app.get('/logo.jpg', (req, res)=>{
    res.sendFile(path.join(__dirname,"logo.jpg"))
})

app.post('/razorpay', async (req, res)=>{
    const payment_capture =1
    const amount = 999
    const currency = 'INR'

    const options = {
        amount: amount * 100,
        currency: currency,
        receipt: shortid.generate(),
        payment_capture
    }

    try{
        const response = await razorpay.orders.create(options)
        console.log(response)
        res.json({
            id:response.id,
            currency: response.currency,
            amount: response.amount
        })
    }catch(error){
        console.log(error)
    }
})

app.listen(5000, ()=> {
    console.log("App is listening on port 5000")
})
