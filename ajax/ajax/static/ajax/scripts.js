//----------- GET EXAMPLES -------------------
 
// GET STRING
function get_data() {
    alert("data fetch request executed");

    fetch('/getdata', {
    })
    .then(response => response.text())
    .then(text => {
        document.querySelector('#blockA').innerHTML = text;
    })
}

// GET JSON
function get_json() {
    alert("json fetch request executed");

    fetch('/getjson', {
        headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest', //Necessary to work with request.is_ajax()
        },
    })
    .then(response => response.json()) //Convert response to JSON
    .then(data => {
        //Perform actions with the response data from the view
        document.querySelector('#blockB').innerHTML = data.item;
    })
}



//----------- POST EXAMPLES -------------------


function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

// POST JSON
function post_json() {
    alert("json fetch request executed");
    //Get csrftoken
    const csrftoken = getCookie('csrftoken');
    fetch('/postjson', {
        method: 'POST',
        credentials: 'same-origin', //Use 'include' for cross-origin-resource-sharing (CORS)
        headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest', //Necessary to work with request.is_ajax()
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify({ post_data : 'This string was sent via a fetch post' }) //JavaScript object of data to POST
    })
    .then(response => response.json()) //Convert response to JSON
    .then(data => {
        //Perform actions with the response data from the view
        document.querySelector('#blockC').innerHTML = data.item;
    })
}

// POST FORM
function post_form() {
    alert("form fetch request executed");
    //Get csrftoken
    const csrftoken = getCookie('csrftoken');


    form = new FormData(document.querySelector('#form-A'));
    //form = new FormData(document.querySelector('#form-block'));

    fetch('/postform', {
        method: 'POST',
        credentials: 'same-origin', //Use 'include' for cross-origin-resource-sharing (CORS)
        headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest', //Necessary to work with request.is_ajax()
            'X-CSRFToken': csrftoken,
        },
        body: form //Form to POST
    })
    // Return data is a string because the django from object has no meaning client side
    .then(response => response.text())
    .then(postform => {
        // do something with your formdata
        console.log(postform);
        document.querySelector('#form-A').innerHTML = postform;
        //document.querySelector('#form-block').innerHTML = postform;
    });
}


// POST FORM RETURN JSON (TO SEPARATE DATA)
function post_form_json_return() {
    alert("form fetch request executed");
    //Get csrftoken
    const csrftoken = getCookie('csrftoken');


    form = new FormData(document.querySelector('#form-B'));

    fetch('/postformB', {
        method: 'POST',
        credentials: 'same-origin', //Use 'include' for cross-origin-resource-sharing (CORS)
        headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest', //Necessary to work with request.is_ajax()
            'X-CSRFToken': csrftoken,
        },
        body: form //Form to POST
    })
        // Return data is a string because the django from object has no meaning client side
        .then(response => response.json())
        .then(data => {
            // do something with your formdata
            console.log(data.form);
            console.log(typeof data.form);
            console.log(data.form.text);
            console.log(data.form.user);

            console.log("------------")

            //console.log(data.errors);
            //console.log(typeof data.errors);
            //console.log(data.errors.text[0]);
            //console.log(data.errors.user[0]);

            //clear form
            const form = document.querySelector('#form-B');
            form.innerHTML = '';
            //render text field
            form.append(renderFormErrors(data.errors.text));
            form.innerHTML += data.form.text;
            //render user field
            form.append(renderFormErrors(data.errors.user));
            form.innerHTML += data.form.user;
        });
}

// Creates a div which contains each error message as a <p></p>.
// The input argument must be of type Array.
function renderFormErrors(errors) {
    const div = document.createElement('div');
    if (errors) {
        for (i = 0; i < errors.length; i++) {
            const p = document.createElement('p')
            p.innerHTML = errors[i];
            div.append(p);
        }
    }
    return div;
}
