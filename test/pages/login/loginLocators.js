class LoginLocators{
    get signInButton(){
        return $("a=Sign in"); // Or "a[href*='/login']" if 'a=Sign in' isn't exact, but let's stick to partial text or original structure. Actually WebdriverIO supports "a=Sign in" or "//*[normalize-space()='Sign in']". Let's use `a*=Sign in` for text match, or just use css where strictly better.
    }
    get signInWithEmailButton(){
        return $("button*=Sign in with Email");
    }
    get emailInput(){
        return $("input.p-inputtext.p-component.input");
    }
    get passwordInput(){
        return $("input[type='password']");
    }
    get signInAfterCredrentials(){
        return $("button[type='submit']");
    }
    get profileIcon(){
        return $("span.p-avatar-text");
    }
    get logOutButton(){
        return $("span*=Logout");
    }
    get closeButton(){
        return $("button[aria-label='Close'] svg");
    }
    get invalidLoginMessage(){
        return $("p.fd-text-primary-600");
    }
    get emailValidationError(){
        return $("small.p-error");
    }
}
module.exports = new LoginLocators();