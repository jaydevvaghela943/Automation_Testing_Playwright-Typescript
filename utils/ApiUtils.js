class ApiUtils {
// IMP : Here Class name and file name will same

    //Helper file
    constructor(apiContext, loginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    //return Token
    async getToken(){
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {data:this.loginPayload}
        );

        const loginResponseJson = await(await loginResponse).json();
        const token = loginResponseJson.token;
        console.log("token==",token);
        return token;
    }

    //Create Order and return OrderId
    async createOrder(orderPayload){
        //Create Order API
        let response = {};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {data:orderPayload,headers:{"authorization":response.token,"content-type":"application/json"}}
        );

        const orderResponseJson = await(await orderResponse).json();
        const orderId = orderResponseJson.orders[0];
        response.orderId = orderId;
        return response;
    }
}

// access globally
module.exports = {ApiUtils};