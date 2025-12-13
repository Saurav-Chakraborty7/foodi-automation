class RestaurantAndCartLocators {
    get locationInput() {
        return $("//span[@class='font-medium text-sm line-clamp-1']");
    }
    get reLocationInput(){
        return $("//span[@class='hide']");
    }
    get submitButtton(){
        return $('//*[@id="pr_id_1"]/div[3]/div/button');
    }
    get foodiLogo(){
        return $("//a[normalize-space()='']//img[@alt='Logo']");
    }
}

module.exports = new RestaurantAndCartLocators();