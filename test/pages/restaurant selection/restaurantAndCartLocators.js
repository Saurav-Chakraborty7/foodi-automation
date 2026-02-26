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

}

module.exports = new RestaurantAndCartLocators();