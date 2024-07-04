/*
Autor: HarukaSan115
Fecha de actualizacion: 09/Feb/2024
Fecha de Salida: 03/Jul/2024
Version 2.0 ~ Rework completo
*/

/*Variable Globaless*/
//Variables de funcion
var time;
var Cargando;
var CursorParpadeante;
var PuntosAnim;

//Variables sin valores iniciales
var PosScrAct;
var PosScrPas;
var objDiv;
var fecha;
var año;
var mes;

//Variables con valores iniciales
var Isvisible = true;
var puntos = 2;

var Frases = new Array();
Frases[0] = "\"Como me trates te tratare, sin excepciones. La base de toda relacion interpersonal es el respeto, no lo olvides.\"";
Frases[1] = "\"Las cosas que no pertenecen a nada ni a nadie, las verdaderas intenciones siempre quedan ocultas hasta el final.\" (Eve, 2019)";
Frases[2] = "\"Exrpimiendo sus cerebros y aferrandose a su codicia cayeron en el abismo del ego.\" (Eve, 2018)";
Frases[3] = "\"En un rincon del mundo estoy reflexionando acerca de lo que verdaderamente me quisiste decir.\" (Eve, 2019)";
Frases[4] = "\"El sol siempre florecera y se alzara dentro de la oscuridad."
Frases[5] = "\"No quiero tus \"disculpas\" porque no necesito mentiras que no se puedan salvar\" (Acane, 2018)"
Frases[6] = "\"Si no puedo liberarme de estos sentimientos, entonces los mezclare y mezclare hasta renacer, en este sueño interminable.\" (Eve, 2019)"
Frases[7] = "\"Si te aferras a tus emociones, en el momento en el que te distraigas, caeras.\" (Eve, 2019)"
Frases[8] = "\"Cruzando mas alla del peor de los dias hacia mi mejor momento.\" (Eve, 2019)"
Frases[9] = "\"Ah~ seremos siempre atromentados por nuestra propia estupidez.\" (Eve, 2019)"
Frases[10] = "\"Ahora que hemos llevado todo ese peso sobre nuestros hombros, es hora de soltarlo.\" (Eve, 2019)"
Frases[11] = "\"Incluso si esta historia llena de sangre y predida se tiñe en una noche oscura, nunca dejare de avanzar.\" (Eve, 2019)"
Frases[12] = "\"Aunque todos nos rindamos fuiste amable conmigo aunque hablabas con amor y odio\" (Eve, 2017)"
Frases[13] = "\"Esa bandera ondeara en lo mas alto, con mis compañeros llegaremos hasta la cima.\" (Eve, 2017)"


var mediaqueryReajuste = window.matchMedia("(max-width: 402px)");
var mediaqueryPortrait = window.matchMedia("(min-width: 0px) and (max-width: 600px)");
var mediaqueryLandscape = window.matchMedia("((min-width:600px) and (max-width: 812px)) or ((min-width:600px) and (max-height: 665px))");
var mediaqueryMidium = window.matchMedia("((min-width: 812px) and (max-width: 1166px)) and (min-height: 666px)");
var mediaqueryLarge = window.matchMedia("(min-width: 1166px) and (min-height: 616px)");

/*Funciones*/

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function deleteCookie(cname) {
  setCookie(cname, "", {
    'max-age': -1
  })
}

function checkCookie() {
  let user = getCookie("username");
  if (user != "") {
    alert("Welcome again " + user);
  } else {
    user = prompt("Please enter your name:", "");
    if (user != "" && user != null) {
      setCookie("username", user, 365);
    }
  }
}

function SelImgPortada() {
  if (window.matchMedia("(min-width: 1166px)").matches) {
    $("#HarukaPresentacion img").attr("src", "Assets/Imagenes/Presentacion6.gif");
    return;
  }
  else if (window.matchMedia("(min-width: 750px)").matches) {
    let random = parseInt(Math.random() * 100);
    switch (true) {
      case (random < 25):
        $("#HarukaPresentacion img").attr("src", "Assets/Imagenes/Presentacion1.gif");
        break;
      case (random >= 25 && random <= 50):
        $("#HarukaPresentacion img").attr("src", "Assets/Imagenes/Presentacion3.gif");
        break;
      case (random > 50 && random <= 75):
        $("#HarukaPresentacion img").attr("src", "Assets/Imagenes/Presentacion5.gif");
        break;
      case (random > 75 && random <= 95):
        $("#HarukaPresentacion img").attr("src", "Assets/Imagenes/Presentacion4.gif");
        break;
      case (random > 95):
        $("#HarukaPresentacion img").attr("src", "Assets/Imagenes/Presentacion6.gif");
        break;
    }
    return;
  }
  else if (window.matchMedia("(min-width: 600px)").matches) {
    $("#HarukaPresentacion img").attr("src", "Assets/Imagenes/Presentacion4.gif");
    return;
  }
  else
    $("#HarukaPresentacion img").attr("src", "Assets/Imagenes/Presentacion2.gif");
  return;
}

function ReajusteTarjeta() {
  if (mediaqueryLarge.matches) {
    clearTimeout(time);
    while (document.getElementById("AreaRedes").childElementCount > 2) {
      document
        .getElementById("AreaRedes")
        .removeChild(document.getElementById("AreaRedes").lastChild);
    }
    document.getElementById("AreaRedes").style.justifyContent = "space-evenly";
    document.getElementById("TempTexto").textContent =
      "Mayormente soft UwU";
  } else {
    pageScroll();
    document.getElementById("TempTexto").textContent = "Soft";
  }
}

function append_clone() {
  if (PosScrAct != PosScrPas) {
    PosScrPas = PosScrAct;
  } else {
    $("#AreaRedes div").clone().appendTo("#AreaRedes");
    PosScrPas = PosScrAct;
  }
}

function pageScroll() {
  objDiv = document.getElementById("AreaRedes");
  objDiv.scrollLeft = objDiv.scrollLeft + 1;
  PosScrAct = objDiv.scrollLeft;
  append_clone();
  time = setTimeout("pageScroll()", 70);
}

function getEdad() {
  fecha = new Date();
  año = fecha.getFullYear();
  mes = fecha.getMonth();

  if (mes < 8) {
    document.getElementById("EdadRealTime").textContent =
      año - 2001 - 1 + " Años";
  } else {
    document.getElementById("EdadRealTime").textContent = año - 2001 + " Años";
  }
}

function AjustarPerfil() {
  if (mediaqueryPortrait.matches) {
    $("#ImagenPerfil figure")
      .removeClass("image is-96x96")
      .addClass("image is-128x128");
    if (document.getElementById("TextoNombre").textContent == "Haruka-San ~ @HarukaSan115") {
      document.getElementById("TextoNombre").textContent = "Haruka-San";
    }
  } else {
    $("#ImagenPerfil figure")
      .removeClass("image is-128x128")
      .addClass("image is-96x96");
    if (document.getElementById("TextoNombre").textContent == "Haruka-San") {
      document.getElementById("TextoNombre").textContent = "Haruka-San ~ @HarukaSan115";
    }
  }
}

function AjustarNombre() {
  let Nombre
  if (mediaqueryPortrait.matches) {
    Nombre = "aruka-San";
  } else {
    Nombre = "aruka-San ~ @HarukaSan115";
  }
  TextoAnimado(Nombre, true, 150);
}


function TextoAnimado(Texto, IsNombre, Velocidad) {
  let ArrayTexto = Texto.split("");
  let contador = 0;
  let ImprimirTexto = setInterval(function () {
    if (IsNombre == true) {
      if (ArrayTexto[contador] == " ") {
        document.getElementById("TextoNombre").textContent +=
          ArrayTexto[contador];
        document.getElementById("TextoNombre").textContent +=
          ArrayTexto[contador + 1];
        contador += 2;
      } else {
        document.getElementById("TextoNombre").textContent +=
          ArrayTexto[contador];
        contador++;
      }
      if (contador == ArrayTexto.length) {
        clearInterval(ImprimirTexto);
        Blink();
      }
    }
    else {
      if (ArrayTexto[contador] == " ") {
        document.getElementById("Frases").textContent +=
          ArrayTexto[contador];
        document.getElementById("Frases").textContent +=
          ArrayTexto[contador + 1];
        contador += 2;
      } else {
        document.getElementById("Frases").textContent +=
          ArrayTexto[contador];
        contador++;
      }
      if (contador == ArrayTexto.length) {
        clearInterval(ImprimirTexto);
      }
    }
  }, Velocidad);
}

function Blink() {
  if (Isvisible == true) {
    $("#Cursor").hide();
    Isvisible = false;
  } else {
    $("#Cursor").show();
    Isvisible = true;
  }
  if (mediaqueryPortrait.matches || (document.getElementById("AreaDescripcion").offsetWidth < 661 && document.getElementById("AreaDescripcion").offsetWidth > 630)) {
    clearTimeout(CursorParpadeante);
    $("#Cursor").hide();
    Isvisible = false;
  }
  CursorParpadeante = setTimeout("Blink()", 500);
}

function CargarTarjeta() {
  if ($("#HarukaPresentacion img").attr("src") == "" && $("EdadRealTime").text() == "") {
    PuntosAnim = setInterval(function () {
      switch (puntos) {
        case 1:
          document.getElementById("TextoLoading").textContent = "Cargando tarjeta.";
          puntos++;
          break;
        case 2:
          document.getElementById("TextoLoading").textContent = "Cargando tarjeta..";
          puntos++;
          break;
        case 3:
          document.getElementById("TextoLoading").textContent = "Cargando tarjeta...";
          puntos = 1;
          break;
      }
    }, 350);
    Cargando = setTimeout("CargarTarjeta()", 100);
  }
  else {
    AjustarNombre();
    $("#loadingScreen").fadeTo(1250, 0, function () {
      clearTimeout(Cargando);
      clearTimeout(PuntosAnim);
      $(document.body).children("#loadingScreen").remove();
      $("#loadingScreen").fadeIn(1250, 0);
    });
  }
}

/*function ReproducirMusica() {
  $("#Repmusica").attr("src", "Assets/Musica/Danganronpa - Trial Underground.wav");
  $("#Repmusica").attr("type", "Audio/WAV");
  document.getElementById("Repmusica").load();
  document.getElementById("Repmusica").loop = true;
  document.getElementById("Repmusica").volume = 0.0255;
  setTimeout(function () {
    document.getElementById("Repmusica").play();
  }, 5000);
}*/

//function NuevaNoti(){
//setTimeout(function() {
//if(getCookie("UltimaVisita") == "" /* && Comprara Fecha de la cookie con la fecha actual*/){
/*FechaVisita = new Date();
console.log(getCookie("UltimaVisita"));
alert(document.cookie);
$(".notification span").text("Muchas gracias por visitar mi tarjeta <3");
$(".notification span").after("<br><span>Si ves un bug notificalo por DM en X</span>");
$(".notification")
       .removeClass("is-slide-left")
       .removeClass("is-danger")
       .removeClass("is-sucess")
       .addClass("is-info")
       .addClass("is-slide-right");
$(".notification").show();
setCookie("UltimaVisita", FechaVisita.toUTCString(), 2);
}
else{
$(".notification span").text("Has vuelto a visitar mi tarjeta OwO");
$(".notification span").after("<br><span>Muchas gracias por revisitar mi tarjeta <3></span>");
$(".notification")
       .removeClass("is-slide-left")
       .removeClass("is-danger")
       .removeClass("is-sucess")
       .addClass("is-info")
       .addClass("is-slide-right");
$(".notification").show();
setCookie("UltimaVisita", FechaVisita.toUTCString(), 2);
}
setTimeout(function (){
$(".notification")
       .removeClass("is-slide-right")
       .addClass("is-slide-left");
       setTimeout(function() {
        $(".notification").remove();
      }, 2500);
}, 10000)*/
//}, 3000/*12000*/);*
//}

function SelFrase() {
  let random = 9;
  switch (true) {
    case random >= 0 && random < 10:
      TextoAnimado(Frases[1], false, 50);
      /*Codigo Aqui*/
      break;
  }
}

/*Eventos*/
$(document).ready(function () {
  CargarTarjeta();
  ReajusteTarjeta();
  AjustarPerfil();
  SelImgPortada();
  getEdad();
  SelFrase();
  //FechaVisita = new Date();
  //setCookie("UltimaVisita", FechaVisita.toUTCString(), 2);

  /*$(".notification .delete").on("click", function () {
    $(this).parent().remove();
  });

  $(".notification .buttons .button.is-danger").on("click", function () {
    $(".buttons").remove();
    $(".notification")
             .removeClass("is-info")
             .addClass("is-danger is-dark");
  
     $(".notification span").text("La musica de fondo no se habilitara");

    setTimeout(function(){
      $(".notification")
             .removeClass("is-slide-right")
             .addClass("is-slide-left");
      setTimeout(function() {
        $(".notification").hide();
        NuevaNoti();
      }, 2500);
    },2000);
  });

  $(".notification .buttons .button.is-success").on("click", function () {
    $(".buttons").remove();
    $(".notification")
             .removeClass("is-info")
             .addClass("is-success is-dark");
  
     $(".notification span").text("Se ha habilitado la musica de fondo");
    setTimeout(function(){
      $(".notification")
             .removeClass("is-slide-right")
             .addClass("is-slide-left");
      setTimeout(function() {
        $(".notification").hide();
        ReproducirMusica();
        NuevaNoti();
      }, 2500);
    },2000);
  });*/

  const images = [
    'Icono.jpg',
    'Presentacion1.gif',
    'Presentacion2.gif',
    'Presentacion3.gif',
    'Presentacion4.gif',
    'Presentacion5.gif',
    'Presentacion6.gif'
    // Agrega todos los nombres de archivo de tus imágenes aquí
  ];

  // Ruta a la carpeta de imágenes
  const imagePath = 'Assets/Imagenes/';

  // Precargar imágenes
  images.forEach(function (image) {
    const img = new Image();
    img.src = imagePath + image;
  });

});

$(window).on("resize", function () {
  clearTimeout(time);
  SelImgPortada();
  ReajusteTarjeta();
  AjustarPerfil();
});
