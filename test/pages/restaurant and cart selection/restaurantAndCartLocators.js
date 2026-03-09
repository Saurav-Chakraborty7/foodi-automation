class RestaurantAndCartLocators {
    get locationInput() {
        return $("//span[@class='font-medium text-sm line-clamp-1']");
    }
    get reLocationInput(){
        return $("//span[normalize-space()='Locate me']");
    }
    get submitButtton(){
        return $('//*[@id="pr_id_1"]/div[3]/div/button');
    }
    get foodiLogo(){
        return $("//a[normalize-space()='']//img[@alt='Logo']");
    }
    get allRestaurants(){
        return $$("//a[contains(@href,'/restaurant')]");
    }
    get allFoodItems(){
        return $$("//div[@class='item cursor-pointer relative']");
    }
    get addToCartButton(){
        return $("//button[normalize-space()='Add to cart']");
    }

    //Cart
    get checkoutButton(){
        return $("//button[contains(normalize-space(),'Go To Checkout')]");
    }
    get subtotalPrice(){
        return $("//p[contains(normalize-space(),'Subtotal')]");
    }
    get deliveryfreePrice(){
        return $("//p[contains(normalize-space(),'Delivery Fee')]");
    }
    get vatPrice(){
        return $("//p[contains(normalize-space(),'VAT')]");
    }
    get platformfeePrice(){
        return $("//p[contains(normalize-space(),'Platform Fee')]");
    }
    get totalpayablePrice(){
        return $("//p[contains(normalize-space(),'Total Payable')]");
    }
    get discountedPrice(){
        return $("//p[@class='text-sm text-gray-600 ']");
    }

}

module.exports = new RestaurantAndCartLocators();