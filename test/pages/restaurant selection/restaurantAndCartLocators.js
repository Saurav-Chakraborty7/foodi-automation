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
    // get banglaFindFood(){
    //     return $('//*[@id="foodi-hero"]/div/div/div[1]/div/form/div/button');
    // }

}

module.exports = new RestaurantAndCartLocators();