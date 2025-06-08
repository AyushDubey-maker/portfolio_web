

var firebaseConfig = {
    apiKey: "AIzaSyB72BTzl1wYISuyPa_GRBfRQ-bxkvZOCBM",
    authDomain: "contact-form-portfolio-36b2d.firebaseapp.com",
    projectId: "contact-form-portfolio-36b2d",
    storageBucket: "contact-form-portfolio-36b2d.appspot.com",
    messagingSenderId: "826021899494",
    appId: "1:826021899494:web:db1a6ec88805efb55d5f27"
  };
  // Initialize Firebase
  
firebase.initializeApp(firebaseConfig);
//Reference messages collection
let messageRef=firebase.database().ref('messages');


document.getElementById('contact-form').addEventListener('submit',submitForm);
      function submitForm(e){
          e.preventDefault();
      //Get Values
      var name=getInputVal('name');
      var subject=getInputVal('subject');
      var email=getInputVal('email');
      var message=getInputVal('message');
     
      if(name===''||email===''){
          alert('Fill the empty fields')
         
        }
        else{
          //saveMessage(name,subject,email,message);
          sendEmail(email,subject,message,name)
          sendEmailClient(email,name)
          alert('Thanks! Your message has been sent.')
          document.querySelector('.contact-form').reset()
      }
      
}

function getInputVal(id){
    return document.getElementById(id).value;
}
// To send email client
function sendEmailClient(email,Name) {
    Email.send({
      Host: "smtp.elasticemail.com",
      Port: 2525,
      Username: "ayush2611co@gmail.com",
      Password: "9414341E5CDF4974AD388F0C2F655B18E5D3",
      To: email,
      From: 'ayush2611co@gmail.com',
      Subject: "Thanks For Feedback",
      Body: "Hey "+Name+", "+"Ayush will get in touch with you soon! ❤️",
    })
      .then(function (message) {
        //alert(message)
      });
  }

  // To send email to admin
  function sendEmail(email,subject,body,Name) {
    Email.send({
      Host: "smtp.elasticemail.com",
      Port: 2525,
      Username: "ayush2611co@gmail.com",
      Password: "9414341E5CDF4974AD388F0C2F655B18E5D3",
      To: "ayush2611co@gmail.com",
      From: 'ayush2611co@gmail.com',
      Subject: subject,
      Body: "Name: "+Name+" <br>"+"Email: "+email+" <br>"+"Body: "+body,
    })
      .then(function (message) {
        //alert(message)
      });
  }
function saveMessage(name,subject,email,message){
    var newMessageRef=messageRef.push();
    newMessageRef.set({
        name:name,
        subject:subject,
        email:email,
        message:message
    });
   
}

// let theme = localStorage.getItem('theme')

let theme = null

if(theme == null){
	setTheme('blue')
}else{
	setTheme(theme)
}
let themeDots = document.getElementsByClassName('theme-dot')


for (var i=0; themeDots.length > i; i++){
	themeDots[i].addEventListener('click', function(){
		let mode = this.dataset.mode
		// console.log('Option clicked:',mode)
		 setTheme(mode)
	})
}
function setTheme(mode){
    if(mode == 'light'){
		document.getElementById('theme-style').href = './static/index.css'
	}

	if(mode == 'blue'){
		document.getElementById('theme-style').href = './static/blue.css'
	}

	if(mode == 'green'){
		document.getElementById('theme-style').href = './static/green.css'
	}

	if(mode == 'purple'){
		document.getElementById('theme-style').href = './static/purple.css'
	}

//	localStorage.setItem('theme', mode)
}

var database = firebase.database().ref().child('messages');
database.once('value', function(snapshot){
    if(snapshot.exists()){
        var content = '';

        snapshot.forEach(function(data){
            var Name = data.val().name;
            var Subject= data.val().subject;
            content += '<tr>';
            content += '<td>' + Name + '</td>'; //column1
            content += '<td>' + Subject + '</td>';//column2
            content += '</tr>';
        });

        // $('#ex-table').append(content);
       // console.log(content);
    }
});


const navSlide = () => {
  const toggle = document.querySelector('.Toggle');
  const nav = document.querySelector('.nav__list');
  const navLinks = document.querySelectorAll('.nav__item');
  
  toggle.addEventListener('click', () => {
      nav.classList.toggle('nav-active');
      
      navLinks.forEach((link, index) => {
          if (link.style.animation) {
              link.style.animation = '';
          } else {
              link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
          }
      });
      
      toggle.classList.toggle('toggle');
  });

  // Add click event to nav items to set active class
  navLinks.forEach(link => {
      link.addEventListener('click', () => {
          // Remove active class from all nav items
          navLinks.forEach(item => item.classList.remove('active'));
          
          // Add active class to the clicked nav item
          link.classList.add('active');
      });
  });
};

navSlide();


