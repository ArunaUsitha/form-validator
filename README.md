
# EZ-validate
A simple form validate plugin used to validate HTML Forms.  

## Author :Aruna Usitha
Simple and light weight Javascript library that validates HTML form elements on the fly.
currently Bootstrap 3,4 are supported.
required JQuery library 2.00 or higher.

## Installation
Add Plugin CSS top of the page & js file on bottom of the page.

## usage

  **inputs should be in a form group, the bootstrap way.** 
  
```html
     <!-- form to validate -->
                  <form id="frmUserRegister" method="post">
                        <div class="row justify-content-center">
                            <div class="col-10">                                                      
                                        <div class="form-group">
                                            <label for="first_name">First Name</label>
                                            <input type="text" class="form-control form-control-sm" id="first_name"
                                                   name="first_name"
                                                   placeholder="First Name">
                                        </div>
                                        <div class="form-group">
                                            <label for="last_name">Last Name</label>
                                            <input type="text" class="form-control form-control-sm" id="last_name"
                                                   name="last_name"
                                                   placeholder="Last Name">
                                        </div> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
    
```


**Load configurations**
```javascript
let options = ({
    formID: 'frmUserRegister',
    animate: true,
    validate: {
       
        first_name: {
            type: 'text',
            methods: 'required'
        },
        password: {  
		type: 'password',  
		methods: 'required|password',  
		passwordConfirmID: 'passwordConf'  
		},
    },
});
```


**initialize the plugin**
```javascript
let v = validator(options);
v.init();
```
## API
After initialization the plugins features can be accessed via Simple API methods


- `v.status()` return the status of the form. `return : Boolean`. 
- `v.resetForm()` reset the form. `return : void`
- `v.setServerValidations(data.responseJSON['errors'])`  show server side validations on the form 

### supported methods

    required
    length=10
    email
    telephone
    password
    number 
    date
	

  
  #### to animate the form Animate.css is required




