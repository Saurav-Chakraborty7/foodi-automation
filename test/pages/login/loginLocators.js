class LoginLocators{
    get signInButton(){
        return $("//a[normalize-space()='Sign in']");
    }
    get signInWithEmailButton(){
        return $("//button[normalize-space()='Sign in with Email']");
    }
    get emailInput(){
        return $("//input[@class='p-inputtext p-component input']");
    }
    get passwordInput(){
        return $("//input[@type='password']");
    }
    get signInAfterCredrentials(){
        return $("//button[@type='submit']");
    }
    get profileIcon(){
        return $("//span[@class='p-avatar-text text-16 font-bold']");
    }
    get logOutButton(){
        return $("//span[normalize-space()='Logout']");
    }
    get closeButton(){
        return $("//button[@aria-label='Close']//*[name()='svg']");
    }
}
module.exports = new LoginLocators();