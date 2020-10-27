var express = require("express");
var cors = require("cors");
var corsOptions = { origin: "*", optionSucessStatus: 200 };
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors(corsOptions));


var modelos = [{
  "id": "1",
  "nombre": "Mascara Facial",
  "precio": 350,
  "imagen": "https://cdn.thingiverse.com/assets/c5/f5/0c/70/73/featured_preview_VISERA_COMPLETA_v3_0.png",
  "link"  : "https://www.thingiverse.com/thing:4305798"
},
{
  "id": "2",
  "nombre": "Maceta Ananá",
  "precio": 1000,
  "imagen": "https://cdn.thingiverse.com/assets/a5/79/50/1e/e4/featured_preview_ananas_planter_v3.png",
  "link"  : "https://www.thingiverse.com/thing:3407969"
},
{
  "id": "6",
  "nombre": "Maceta poliédrica",
  "precio": 800,
  "imagen": "https://cdn.thingiverse.com/assets/96/b1/84/52/e4/featured_preview_random_polyhedron_distributed.png",
  "link"  : "https://www.thingiverse.com/thing:4162559"
},
{
  "id": "3",
  "nombre": "Anillo de Sauron - Señor de los Anillos",
  "precio": 150,
  "imagen": "https://cdn.thingiverse.com/assets/4a/ae/f6/48/3a/ring_lotr_23mm55.png",
  "link"  : "https://www.thingiverse.com/thing:3715894"
},
{
  "id": "4",
  "nombre": "Tierra escala 1 en 120 millones",
  "precio": 1800,
  "imagen": "https://cdn.thingiverse.com/assets/54/55/f7/7a/3b/featured_preview_earth_1_12_10_7.stl",
  "link"  : "https://www.thingiverse.com/thing:3612782"
},
{
  "id": "5",
  "nombre": "Estrella de la muerte escala 1 en 2 millones",
  "precio": 1035,
  "imagen": "https://cdn.thingiverse.com/renders/db/08/48/1d/84/39e73fbd9dccae2c62a1473e6c63bef0_preview_featured.jpg",
  "link"  : "https://www.thingiverse.com/thing:3432933"
}]



var id = 20;


app.get("/modelos", function (req, res) {
  setTimeout(function () {
    res.send(modelos);

    return;
  }, 2000);



});

app.get("/modelos/:id", function (req, res) {
  console.log(req.params.id);
  if (req.params.id > 0) {
    var modelos1 = modelos;
    modelos1.forEach(item => {

      if (item.id == req.params.id) {

        modelos1 = item;

      }
    });
    res.send(modelos1);
    return;

  } else {
    res.send({ 'type': 'error' });
    return;
  }

});




app.post("/login", function (req, res) {
  setTimeout(function () {
    console.log("Llego al servidor " + JSON.stringify(req.body));


    if (req.body.email != undefined && req.body.password != undefined) {
      if (req.body.email === "usuario" && req.body.password === "1234") {
        console.log("Sale del servidor " + "{'type': 'User'}")
        res.send({ 'type': 'User' });
      } else if (req.body.email === "admin" && req.body.password === "1234") {
        console.log("Sale del servidor " + "{'type': 'Admin'}")
        res.send({ 'type': 'Admin' });
      } else {
        console.log("Sale del servidor " + "{'type': 'error'}")
        res.send({ 'type': 'error' });
      }
      return;
    }
    console.log("Sale del servidor " + "{'type': 'error'}")
    res.send({ 'type': 'error' });
  }, 2000);

});


app.post("/modelos", function (req, res) {
  console.log(req.body);
  setTimeout(function () {
    if ((req.body.nombre != undefined && req.body.nombre != "") && (req.body.precio != undefined)
      && (req.body.cantidad != undefined) && (req.body.imagen != undefined && req.body.imagen != "")) {

      id = id + 1;


      var data = { "id": id, "nombre": req.body.nombre, "precio": req.body.precio, "cantidad": req.body.cantidad, "imagen": req.body.imagen, "link": req.body.link };
      modelos.push(data);
      res.send(data);

      return;
    }
    res.send({ 'type': 'error' });
  }, 2000);

});

app.put("/modelos/:id", function (req, res) {
  console.log(req.params.id);
  setTimeout(function () {

    console.log(req.body);

    if ((req.body.nombre != undefined && req.body.nombre != "") && (req.body.imagen != undefined && req.body.imagen != "")      && (req.body.precio != undefined)) {



      for (var i = 0; i < modelos.length; i++) {
        if (req.params.id == modelos[i].id) {
          console.log("Actualiza")
          modelos[i].nombre = req.body.nombre;
          modelos[i].precio = req.body.precio;
          modelos[i].imagen = req.body.imagen;
          modelos[i].link = req.body.link;
          res.send(req.body);
          return;
        }
      }

    }
    res.send({ 'type': 'error' });
  }, 2000);

});



app.delete("/modelos/:id", function (req, res) {
  console.log(req.params.id);
  setTimeout(function () {

    console.log(req.params.id);
    if (req.params.id != undefined) {

      for (var i = 0; i < modelos.length; i++) {
        if (req.params.id == modelos[i].id) {
          modelos.splice(i, 1);
          var data = { "type": "ok" };
          res.send(data);
          return;
        }
      }



    }
    res.send({ 'type': 'error' });
  }, 2000);

});

app.listen(3000, function () {
  console.log("Api en el puerto 3000");
});