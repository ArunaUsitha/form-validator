/**
 * @Author :Aruna|Killer
 * used to validate html input elements on the fly
 * of a form
*/


let results = {};
let status = true;

let debugMode

function addStyles(selector, response, type) {

    if (type == 'radio') {

        selector.siblings('.verror').html(response).css({
            'font-size': '11px',
        })
        selector.closest('.form-group').addClass('has-error');
    } else {

        selector.closest('.form-group').find('.verror').html(response).css({
            'font-size': '11px',
            // 'color': '#D81159'
        });
        selector.closest('.form-group').addClass('has-error');
    }


}

function removeStyles(selector, type) {
    if (type == 'radio') {
        selector.closest('.form-group').find('.verror').html('').css({
            'font-size': '11px',
        })
        selector.closest('.form-group').removeClass('has-error');
    } else {
        selector.closest('.form-group').find('.verror').html('').css({
            'font-size': '11px',
            // 'color': '#D81159'
        });
        selector.closest('.form-group').removeClass('has-error');
    }
}


function debugLog(text, data) {
    if (debugMode == true) {
        console.log(text);
        console.log(data)
    }
}


// check and validate
function checkAndValidate(dataAttributes, element) {

    // debugLog('Main Validator Method :  ', element)

    if (element[0].id !== '') {

        if (element.is(":visible")) {

            let attributes = dataAttributes.split(',');
            $.each(attributes, function (index, value) {

                    //required
                    if (value === 'required') {


                        // added support for text area propper validation
                        if (element[0].tagName && element[0].tagName.toLowerCase() == "textarea") {

                            if (/^\s*$/g.test(element.val())) {
                                addStyles(element, 'This field is required!');
                                results[element[0].id] = false;
                            } else {
                                removeStyles(element);
                                results[element[0].id] = true;
                            }


                        } else {


                            if (element.val() == '' || element.val() == null || element.val().trim() == '') {
                                addStyles(element, 'This field is required!');
                                results[element[0].id] = false;

                            } else {

                                removeStyles(element);
                                results[element[0].id] = true;
                            }
                        }

                    }


                    //length
                    if ((/length/).test(value)) {
                        let length = value.split('=')[1];
                        if (!(element.val().length > length)) {
                            addStyles(element, 'This value should be ' + length + ' characters');
                            results[element[0].id] = false;
                        } else {
                            // removeStyles(element);
                            results[element[0].id] = true;
                        }
                    }

                    //telephone no
                    if (value === 'telephone') {

                        let regx = /^[0-9]+$/;
                        if (element.val().length > 0) {
                            if (element.val().length < 10 || element.val().length > 10 || !(element.val().match(regx))) {
                                addStyles(element, 'Enter a valid phone No (10 characters excluding +94)');
                                results[element[0].id] = false;
                            } else {
                                removeStyles(element);
                                results[element[0].id] = true;
                            }
                        } else {

                        }
                    }

                    //email
                    if (value === 'email') {

                        if (element.val().length > 0) {
                            let emil = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            if (!(element.val().match(emil))) {
                                addStyles(element, 'Enter valid Email Address');
                                results[element[0].id] = false;
                            } else {
                                removeStyles(element);
                                results[element[0].id] = true;
                            }
                        } else {
                            // removeStyles(element);
                            // results[element[0].id] = true;
                        }
                    }


                    //password
                    if (value === 'password') {

                        if (element.val() !== '') {
                            let conf = $(element).parent().parent().find('[data-validate*="passwordconfirm"]');

                            if (!(element.val() === conf.val())) {
                                addStyles(element, 'Passwords doesn\'t match');
                                addStyles(conf, 'Passwords doesn\'t match');
                                results[element[0].id] = false;
                            } else {
                                removeStyles(element);
                                removeStyles(conf);
                                results[element[0].id] = true;
                            }
                        }

                    }

                    if (value === 'passwordconfirm') {

                        if (element.val() !== '') {
                            let conf = $(element).parent().parent().find('[data-validate*="password"]');
                            if (!(element.val() === conf.val())) {
                                addStyles(element, 'Passwords doesn\'t match');
                                addStyles(conf, 'Passwords doesn\'t match');
                                results[element[0].id] = false;
                            } else {
                                removeStyles(element);
                                removeStyles(conf);
                                results[element[0].id] = true;
                            }
                        }
                    }


                    //number
                    if (value === 'number') {


                        if (element.val() !== '') {
                            let num = /^\d*$/;

                            if (!(element.val().match(num))) {
                                addStyles(element, 'Please enter only numbers');
                                results[element[0].id] = false;
                            } else {
                                removeStyles(element);
                                results[element[0].id] = true;
                            }
                        }

                    }


                    // for radio button
                    if (value === 'radioBt') {
                        let btList = $(element).closest('.validate-radio-button-area').find('input:radio[name=' + element[0].name + ']');
                        let r = false;

                        $.each(btList, function (key, value) {
                            if ($(value).prop('checked')) {
                                r = true;
                            }
                        });

                        if (r) {
                            results[element[0].id] = true;
                            removeStyles(element, 'radio');
                        } else {
                            results[element[0].id] = false;
                            addStyles(element, 'Please select option', 'radio');
                        }

                    }

                    //date
                    if (value === 'date') {


                        function isValidDate(dateString) {
                            // First check for the pattern
                            var regex_date = /^\d{4}\-\d{1,2}\-\d{1,2}$/;

                            if (!regex_date.test(dateString)) {
                                return false;
                            }

                            // Parse the date parts to integers
                            var parts = dateString.split("-");
                            var day = parseInt(parts[2], 10);
                            var month = parseInt(parts[1], 10);
                            var year = parseInt(parts[0], 10);

                            // Check the ranges of month and year
                            if (year < 1000 || year > 3000 || month == 0 || month > 12) {
                                return false;
                            }

                            var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

                            // Adjust for leap years
                            if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
                                monthLength[1] = 29;
                            }

                            // Check the range of the day
                            return day > 0 && day <= monthLength[month - 1];
                        }


                        if (!isValidDate(element.val())) {
                            addStyles(element, 'Please enter correct date');
                            results[element[0].id] = false;
                        } else {
                            removeStyles(element);
                            results[element[0].id] = true;
                        }


                    }


                }
            );

        } else {
            removeStyles(element);
        }
    } else {
        throw "Critical error, Elements ID not defined in : " + element.attr('name') + ". validation falied.!";
        status = false;
    }
}


let validator = function validateForm(parameters) {


    results = {};
    status = true;


    let formID = parameters.formID;
    let animate = parameters.animate;
    debugMode = parameters.debugMode;
    let cssClass = 'animate shake';


    (debugMode == true) ? debugLog('FormValidator Debug Mode Enabled. Debugging....!', '') : '';

    function shake(formID) {
        if (animate !== false) {
            $(formID).addClass(cssClass).delay(1000).queue(function (next) {
                $(this).removeClass(cssClass);
                next();
            });
        }
    }


    let clss = '.validate';

    let inputs = $(formID + ' ' + clss);

    debugLog('form ID', formID);
    debugLog('validate class', clss);

    debugLog('Inputs List', inputs);

    if (inputs.length > 0) {

        // noinspection JSAnnotator
        $.each(inputs, function (index, value) {

            let selector = $(this);
            try {
                checkAndValidate($(this).data('validate'), selector);
            } catch (e) {
                console.error(e)
                return false;
            }

        })
    }


    $.each(results, function (index, value) {

        if (value == false) {
            status = false;
            shake(formID);
            return false
        }


    });

    debugLog('status', status)
    debugLog('results', results)
    return status;


};


function getEventListners(obj) {

    var c = $._data(obj, "events").keyup;
    // console.log(c)
    return c

}


let eventListners = function () {

    let eventListner = [];
    let object;

    let get = function (obj) {
        object = obj;

        let el = $._data(obj, "events").keyup;

        if (el) {
            if (el.length) {
                if (el.length > 0) {

                    $.each(el, function (k, v) {

                        eventListner.push(v.handler)

                    })

                }

            }
        }


    }


    let reAttach = function () {

        $.each(eventListner, function (k, v) {
            $(document).on('keyup', object, function () {
                v
            })
        })

    }


    return {
        get: get,
        reAttach: reAttach
    }
}()


//realtime validations
$(document).on('change keyup click', '.validate-realTime', function (e) {
    results = {};
    status = true;
    let isDate = false;

    let attributes = $(this).data('validate').split(',')
    $.each(attributes, function (k, v) {
        if (v == 'date') {
            isDate = true
        }
    })

    if (isDate) {
        eventListners.get(this)

        $(this).off('keyup');
        $(this).off('keydown');
        $(this).off('change');

    }

    //main check
    checkAndValidate($(this).data('validate'), $(this));

    if (isDate) {
        eventListners.reAttach()
    }


})



