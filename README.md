# form-validator
A simple form validate plugin used to validate HTML Forms.  

# Author :Aruna|Killer

 used to validate html input elements on the fly
 of a form

 required Jquery library 2.00 or higher

 usage :
  inputs should be in a form group, the bootstrap way. as example
     
     <form id="form-to-validate">
      <div class="custom-form-user">
         <div class="form-group">
           <label for="testInput" class="col-sm-2 control-label">test input</label>
            <div class="col-sm-8">
            <input type="text" class="form-control validate"  name="testInput" id="testInput" placeholder="testInput" data-   validate="required">
            <span class="verror"></span>
            </div>
         </div>
     </div>
    </form>

  for the input field that you want to validate add the class 'validate'
  then add the types you want to validate Ex: password,required,length as comma seperated data attributes

  data-validate = 'required,length=10,password'

  then call the method using the form id

    validateForm('#form-to-validate');

  and the script shoud be included on the bottom of the page



