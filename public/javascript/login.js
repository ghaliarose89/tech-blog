async function loginForm(event) {
	event.preventDefault();
	const email = document.querySelector("#email").value.trim();
	const password = document.querySelector("#password").value.trim();
	if (email === "") {
		document.querySelector("#email").style.background = "red";
		document.querySelector("#errMsg").innerHTML = "Please enter your email";
	} else if (password === "") {
		document.querySelector("#password").style.background = "red";
		document.querySelector("#errMsg").innerHTML = "Please enter your password";
	}
	if (email === "" && password === "") {
		document.querySelector("#password").style.background = "red";
		document.querySelector("#email").style.background = "red";
		document.querySelector("#errMsg").innerHTML =
			"Please enter the required information";
	}

	if (email && password) {
		const response = await fetch("/api/users/login", {
			method: "post",
			body: JSON.stringify({
				email,
				password,
			}),
			headers: { "Content-Type": "application/json" },
		});
		if (response.ok) {
			console.log("ok");
			document.location.replace("/");
		} else alert(response.status);
		// document.querySelector("#errMsg").innerHTML =
		// "Incorrect Password Or Email ";
	}
}

async function logout() {
	
	const response = await fetch("/api/users/logout", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		console.log("Logged out");
		document.location.replace("/");
	} else {
		alert(response.statusText);
	}
};
if (document.getElementById("login")) {
document.getElementById("login").addEventListener("click", loginForm);
}
if (document.getElementById("logout")) {
	document.getElementById("logout").addEventListener("click", logout);

}


async function signupFormHandler(event) {
	event.preventDefault();
	
	const username = document.querySelector('#username-signup').value.trim();
	const email = document.querySelector('#email-signup').value.trim();
	const password = document.querySelector('#password-signup').value.trim();
	console.log(username)
	if (email === "") {
		document.querySelector('#email-signup').background = "red";
		document.querySelector("#errMsg2").innerHTML = "Please enter your email";
	} else if (password === "") {
		document.querySelector('#password-signup').style.background = "red";
		document.querySelector("#errMsg2").innerHTML = "Please enter your password";
	}
	if(username === ''){
		document.querySelector('#username-signup').style.background='red';
		document.querySelector("#errMsg2").innerHTML = "Please enter user name";
	}
	if (email === "" && password === "" && username === '') {
		document.querySelector('#email-signup').style.background = "red";
		document.querySelector('#password-signup').style.background = "red";
		document.querySelector('#username-signup').style.background='red'
		document.querySelector("#errMsg2").innerHTML =
			"Please enter the required information";
	}
	if (username && email && password) {
	  const response = await fetch('/api/users', {
		method: 'post',
		body: JSON.stringify({
		  username,
		  email,
		  password,
		}),
		headers: { 'Content-Type': 'application/json' }
	  });
  
	  if (response.ok) {
		document.location.replace('/');
	  } else {
		alert(response.statusText);
	  }
	}
  }
  
 
  
