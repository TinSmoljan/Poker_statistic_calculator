window.addEventListener("DOMContentLoaded", () => {
  let path = require("path");
  let fs = require("fs");
  let files, vs, directory;

  function nameOfImage(file) {
    //stvaramo html paragraph element koji ce bit naziv za image elemente koje stvorimo
    let name = document.createElement("H2");
    name.innerHTML = file;
    return name;
  }

  function image(src) {
    //stvaramo html image element kojeg cemo kasnije appendat
    var img = document.createElement("img");
    img.src = src;
    img.alt = "image not found";
    return img;
  }

  function removeAllChildNodes(parent) {
    //micemo image elemente iz ispisa
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }

  function renderSBorBB(slucaj) {
    //posto su BB i SB posebni slucajevi koji zasad nemaju VS komponentu treba nam ovo
    directory = path.join(__dirname, `/denki na steroidima/PREFLOP/${slucaj}/${vrijednost_uloga}BB/`);
    files = fs.readdirSync(directory);
    files.forEach((file) => {
      izlaz.appendChild(nameOfImage(file));
      izlaz.appendChild(image(path.join(directory, file)));
    });
    trenutni_ispis.textContent = `/denki na steroidima/PREFLOP/${slucaj}/${vrijednost_uloga}BB/`;
  }

  function renderTwoPositions(prvi) {
    //kada imamo 2 izabrane pozicije
    removeAllChildNodes(izlaz); //makni prosle slike
    vs = vrijednost_pozicije.replace(prvi, ""); //druga vrijednost osim one koju dobijamo kao argument funkcije
    directory = path.join(__dirname, `/denki na steroidima/PREFLOP/${prvi}/${vrijednost_uloga}BB/VS. ${vs}/`);
    files = fs.readdirSync(directory); //nadi taj direktorij
    files.forEach((file) => {
      izlaz.appendChild(nameOfImage(file));
      izlaz.appendChild(image(path.join(directory, file))); //ispisi sve slike iz direktorija
    });
    trenutni_ispis.textContent = `./denki na steroidima/PREFLOP/${prvi}/${vrijednost_uloga}BB/VS ${vs}/`; //da znas di se nalazis
  }

  function renderThreePositions(prvi, drugi, zadnji) {
    //ra renderiranje multiwaya sa 3 pozicije
    directory = path.join(__dirname, `/denki na steroidima/PREFLOP/${prvi}/${vrijednost_uloga}BB/MULTIWAY/VS. ${drugi} VS. ${zadnji}/`);
    files = fs.readdirSync(directory);
    files.forEach((file) => {
      izlaz.appendChild(nameOfImage(file));
      izlaz.appendChild(image(path.join(directory, file)));
    });
    trenutni_ispis.textContent = `/denki na steroidima/PREFLOP/${prvi}/${vrijednost_uloga}BB/MULTIWAY/VS. ${drugi} VS. ${zadnji}/`;
  }

  function addChildAndRender(temp, slucaj) {
    if (slucaj === "pozicija") {
      //za refreshanje u slucaj promjene pozicije
      vrijednost_pozicije += temp; //update-anje vrijednosti pozicije
      if (vrijednost_uloga.length == 0) {
        //ako nema pritisnutih botuna
        trenutni_ispis.textContent =
          vrijednost_pozicije.length == 0 ? "Unesite vrijednosti uloga i pozicije" : "Unesite vrijednost uloga za ispis";
      } else if (vrijednost_pozicije.length <= 3) {
        //ako smo pritsli samo jedan botun na poziciji
        if (vrijednost_pozicije.includes("SB")) {
          renderSBorBB("SB");
        } else if (vrijednost_pozicije.includes("BB")) {
          renderSBorBB("BB");
        } else {
          izlaz.appendChild(nameOfImage("RFI.png"));
          izlaz.appendChild(image(`./denki na steroidima/PREFLOP/${vrijednost_pozicije}/${vrijednost_uloga}BB/RFI.png`)); //dodaj sliku u ispis
          trenutni_ispis.textContent = `./denki na steroidima/PREFLOP/${vrijednost_pozicije}/${vrijednost_uloga}BB/RFI.png`; //za lakse pracenje di se nalazimo tocno
        }
      } else if (vrijednost_pozicije.length > 3 && vrijednost_pozicije.length <= 5) {
        //ako smo 2 botuna pritisli
        if (vrijednost_pozicije.includes("EP")) {
          //ako je ijedna od tih vrijednsoti EP
          renderTwoPositions("EP");
        } else if (vrijednost_pozicije.includes("MP")) {
          //ako je ijedna od tih vrijednsoti MP
          renderTwoPositions("MP");
        } else if (vrijednost_pozicije.includes("HJ")) {
          //ako je ijedna od tih vrijednsoti HJ
          renderTwoPositions("HJ");
        } else if (vrijednost_pozicije.includes("CO")) {
          //ako je ijedna od tih vrijednsoti CO
          renderTwoPositions("CO");
        } else if (vrijednost_pozicije.includes("BTN")) {
          //ako je ijedna od tih vrijednsoti BTN
          renderTwoPositions("BTN");
        }
      } else if (vrijednost_pozicije.length > 5 && vrijednost_pozicije.length <= 7) {
        //ako smo 3 botuna pritisnuli
        if (vrijednost_pozicije.includes("EP")) {
          removeAllChildNodes(izlaz);
          vs = vrijednost_pozicije.replace("EP", "");
          if (vs.includes("MP")) {
            renderThreePositions("EP", "MP", vs.replace("MP", ""));
          } else if (vs.includes("HJ")) {
            renderThreePositions("EP", "HJ", vs.replace("HJ", ""));
          } else if (vs.includes("CO")) {
            renderThreePositions("EP", "CO", vs.replace("CO", ""));
          } else if (vs.includes("BTN")) {
            renderThreePositions("EP", "BTN", vs.replace("BTN", ""));
          } else if (vs.includes("SB")) {
            renderThreePositions("EP", "SB", vs.replace("SB", ""));
          }
        } else if (vrijednost_pozicije.includes("MP")) {
          removeAllChildNodes(izlaz);
          vs = vrijednost_pozicije.replace("MP", "");
          if (vs.includes("HJ")) {
            renderThreePositions("MP", "HJ", vs.replace("HJ", ""));
          } else if (vs.includes("CO")) {
            renderThreePositions("MP", "CO", vs.replace("CO", ""));
          } else if (vs.includes("BTN")) {
            renderThreePositions("MP", "BTN", vs.replace("BTN", ""));
          } else if (vs.includes("SB")) {
            renderThreePositions("MP", "SB", vs.replace("SB", ""));
          }
        } else if (vrijednost_pozicije.includes("HJ")) {
          removeAllChildNodes(izlaz);
          vs = vrijednost_pozicije.replace("HJ", "");
          if (vs.includes("CO")) {
            renderThreePositions("HJ", "CO", vs.replace("CO", ""));
          } else if (vs.includes("BTN")) {
            renderThreePositions("HJ", "BTN", vs.replace("BTN", ""));
          } else if (vs.includes("SB")) {
            renderThreePositions("HJ", "SB", vs.replace("SB", ""));
          }
        } else if (vrijednost_pozicije.includes("CO")) {
          removeAllChildNodes(izlaz);
          vs = vrijednost_pozicije.replace("CO", "");
          if (vs.includes("BTN")) {
            renderThreePositions("co", "BTN", vs.replace("BTN", ""));
          } else if (vs.includes("SB")) {
            renderThreePositions("co", "SB", vs.replace("SB", ""));
          }
        } else if (vrijednost_pozicije.includes("BTN")) {
          removeAllChildNodes(izlaz);
          vs = vrijednost_pozicije.replace("BTN", "");
          if (vs.includes("SB")) {
            renderThreePositions("BTN", "SB", vs.replace("SB", ""));
          }
        }
      }
    } else if (slucaj === "ulog") {
      //za refreshanje u slucaj promjene uloga, logika izad ovoga je ista kao i kod "pozicija" samo moramo ovdje dodati da se refresha kad prominimo i ulog
      vrijednost_uloga = temp; //update-anje vrijednosti uloga
      if (vrijednost_pozicije.length == 0) {
        //ako nema uloga ispis to
        trenutni_ispis.textContent =
          vrijednost_uloga.length == 0 ? "Unesite vrijednosti pozicije i uloga" : "Unesite vrijednost pozicije za ispis";
      } else if (vrijednost_pozicije.length <= 3) {
        if (vrijednost_pozicije == "SB") {
          renderSBorBB("SB");
        } else if (vrijednost_pozicije == "BB") {
          renderSBorBB("BB");
        } else {
          izlaz.appendChild(nameOfImage("RFI.png"));
          izlaz.appendChild(image(`./denki na steroidima/PREFLOP/${vrijednost_pozicije}/${vrijednost_uloga}BB/RFI.png`)); //dodaj sliku u ispis
          trenutni_ispis.textContent = `./denki na steroidima/PREFLOP/${vrijednost_pozicije}/${vrijednost_uloga}BB/RFI.png`; //za lakse pracenje di se nalazimo tocno
        }
      } else if (vrijednost_pozicije.length > 3 && vrijednost_pozicije.length <= 5) {
        if (vrijednost_pozicije.includes("EP")) {
          //ako je ijedna od tih vrijednsoti EP
          renderTwoPositions("EP");
        } else if (vrijednost_pozicije.includes("MP")) {
          //ako je ijedna od tih vrijednsoti MP
          renderTwoPositions("MP");
        } else if (vrijednost_pozicije.includes("HJ")) {
          //ako je ijedna od tih vrijednsoti HJ
          renderTwoPositions("HJ");
        } else if (vrijednost_pozicije.includes("CO")) {
          //ako je ijedna od tih vrijednsoti CO
          renderTwoPositions("CO");
        } else if (vrijednost_pozicije.includes("BTN")) {
          //ako je ijedna od tih vrijednsoti BTN
          renderTwoPositions("BTN");
        }
      } else if (vrijednost_pozicije.length > 5 && vrijednost_pozicije.length <= 7) {
        if (vrijednost_pozicije.includes("EP")) {
          removeAllChildNodes(izlaz);
          vs = vrijednost_pozicije.replace("EP", "");
          if (vs.includes("MP")) {
            renderThreePositions("EP", "MP", vs.replace("MP", ""));
          } else if (vs.includes("HJ")) {
            renderThreePositions("EP", "HJ", vs.replace("HJ", ""));
          } else if (vs.includes("CO")) {
            renderThreePositions("EP", "CO", vs.replace("CO", ""));
          } else if (vs.includes("BTN")) {
            renderThreePositions("EP", "BTN", vs.replace("BTN", ""));
          } else if (vs.includes("SB")) {
            renderThreePositions("EP", "SB", vs.replace("SB", ""));
          }
        } else if (vrijednost_pozicije.includes("MP")) {
          removeAllChildNodes(izlaz);
          vs = vrijednost_pozicije.replace("MP", "");
          if (vs.includes("HJ")) {
            renderThreePositions("MP", "HJ", vs.replace("HJ", ""));
          } else if (vs.includes("CO")) {
            renderThreePositions("MP", "CO", vs.replace("CO", ""));
          } else if (vs.includes("BTN")) {
            renderThreePositions("MP", "BTN", vs.replace("BTN", ""));
          } else if (vs.includes("SB")) {
            renderThreePositions("MP", "SB", vs.replace("SB", ""));
          }
        } else if (vrijednost_pozicije.includes("HJ")) {
          removeAllChildNodes(izlaz);
          vs = vrijednost_pozicije.replace("HJ", "");
          if (vs.includes("CO")) {
            renderThreePositions("HJ", "CO", vs.replace("CO", ""));
          } else if (vs.includes("BTN")) {
            renderThreePositions("HJ", "BTN", vs.replace("BTN", ""));
          } else if (vs.includes("SB")) {
            renderThreePositions("HJ", "SB", vs.replace("SB", ""));
          }
        } else if (vrijednost_pozicije.includes("CO")) {
          removeAllChildNodes(izlaz);
          vs = vrijednost_pozicije.replace("CO", "");
          if (vs.includes("BTN")) {
            renderThreePositions("co", "BTN", vs.replace("BTN", ""));
          } else if (vs.includes("SB")) {
            renderThreePositions("co", "SB", vs.replace("SB", ""));
          }
        } else if (vrijednost_pozicije.includes("BTN")) {
          removeAllChildNodes(izlaz);
          vs = vrijednost_pozicije.replace("BTN", "");
          if (vs.includes("SB")) {
            renderThreePositions("BTN", "SB", vs.replace("SB", ""));
          }
        }
      }
    } else {
      //error, ako smo krivo poslali koju vrijednost u funkciju
      console.error("Krivo unesena vrijednost appendanje childa, provjeri sto si poslao kao 'slucaj' varijablu u addChildAndRender");
    }
  }

  function removeChildAndRender(temp, slucaj) {
    //kada deselektiramo odredenu poziciju ili ulog
    let ostatak;
    if (slucaj === "pozicija") {
      if (vrijednost_pozicije.length <= 3) {
        vrijednost_pozicije = vrijednost_pozicije.replace(temp, ""); //maknit tu vrijednost iz querija kojeg cemo obavljat da ispisemo sliku
        removeAllChildNodes(izlaz); //izbaci sliku iz izlaza
        trenutni_ispis.textContent =
          vrijednost_uloga.length == 0 ? "Unesi vrijednost pozicije i uloga" : "Unesi vrijednost pozicije za ispis"; //za lakse pracenje
      } else if (vrijednost_pozicije.length > 3 && vrijednost_pozicije.length <= 5) {
        //ako imamo 2 selektirane pozicije kad deselktiramo jednu da nam se vrati ispis RIF od te koja je ostala selektirana
        removeAllChildNodes(izlaz);
        ostatak = vrijednost_pozicije.replace(temp, ""); //trazimo tu koja je ostala
        vrijednost_pozicije = "";
        addChildAndRender(ostatak, "pozicija"); //renderiramo RIF od te pozicije koja je ostala
      } else if (vrijednost_pozicije.length > 5 && vrijednost_pozicije.length <= 7) {
        removeAllChildNodes(izlaz);
        ostatak = vrijednost_pozicije.replace(temp, "");
        vrijednost_pozicije = "";
        addChildAndRender(ostatak, "pozicija");
      }
    } else if (slucaj === "ulog") {
      //ako deselektiramo ulog ispisujemo ništa jer samo jedan ulog smije bit selektiran
      vrijednost_uloga = vrijednost_uloga.replace(temp, "");
      removeAllChildNodes(izlaz);
      trenutni_ispis.textContent =
        vrijednost_pozicije.length == 0 ? "Unesi vrijednost pozicije i uloga" : "Unesi vrijednost pozicije za ispis";
    }
  }

  let pozicije = document.getElementsByClassName("pozicija"); //sve pozicije
  let vrijednost_pozicije = ""; //sta smo trenutno odabrali po pitanju pozicije
  let izlaz = document.getElementById("ispis"); //element gdje ce se slike ispisat
  let trenutni_ispis = document.getElementById("trenutni_ispis"); // na vrhu ispis da mi je lakse pratit sta je trenutno odabrano

  for (let i = 0; i < pozicije.length; i++) {
    //za sve pozicije
    pozicije[i].addEventListener("click", () => {
      if (pozicije[i].classList.contains("aktivno")) {
        //ako je aktivna
        pozicije[i].classList.remove("aktivno"); //nakon clicka nek postane neaktivna
        removeChildAndRender(pozicije[i].textContent, "pozicija");
      } else {
        //ako nije aktivna
        pozicije[i].classList.add("aktivno"); //nek postane aktivna
        addChildAndRender(pozicije[i].textContent, "pozicija");
      }
    });
  }

  let ulozi = document.getElementsByClassName("ulog"); //svi ulozi
  let izabran_ulog = false; //je li izabran ikoji ulog trenutno
  let vrijednost_uloga = ""; //koji je ulgo trenutno odabran

  for (let i = 0; i < ulozi.length; i++) {
    //za sve uloge
    ulozi[i].addEventListener("click", () => {
      if (ulozi[i].classList.contains("aktivno")) {
        //kad kliknemo ako je taj ulog aktivan
        ulozi[i].classList.remove("aktivno"); //nek postane neaktivan
        izabran_ulog = false; //da znamo da trenutno nikoji nije odabran
        vrijednost_uloga = ""; //posto nikoji nije odabran nece imati ni vrijednost nikoju

        removeChildAndRender(ulozi[i].textContent, "ulog");
      } else {
        //kad kliknemo ako taj ulog nije aktivan
        if (izabran_ulog == false) {
          //provjeravamo da li ima aktivnih uloga
          ulozi[i].classList.add("aktivno"); //ako nema dodajemo da je trenutni kojeg pritscemo aktivan
          izabran_ulog = true; //stavljamo da sada postoji jedan koji je aktivan
          addChildAndRender(ulozi[i].textContent, "ulog");
        } else {
          //ako ima aktivnih uloga
          for (let j = 0; j < ulozi.length; j++) {
            //prođi kroz sve uloge koji nisu ovaj
            if (ulozi[j].classList.contains("aktivno")) {
              //ako je ulog aktivan
              ulozi[j].classList.remove("aktivno"); //deaktiviraj ga

              removeAllChildNodes(izlaz);
            }
          }
          ulozi[i].classList.add("aktivno"); //nek je ovaj ulog sad aktivan
          addChildAndRender(ulozi[i].textContent, "ulog");
        }
      }
    });
  }

  let izbrisi = document.getElementById("izbrisi");
  izbrisi.addEventListener("click", () => {
    for (let i = 0; i < pozicije.length; i++) {
      if (pozicije[i].classList.contains("aktivno")) {
        //ako je aktivna
        pozicije[i].classList.remove("aktivno");
      }
    }
    for (let i = 0; i < ulozi.length; i++) {
      if (ulozi[i].classList.contains("aktivno")) {
        //ako je aktivna
        ulozi[i].classList.remove("aktivno");
      }
    }
    vrijednost_pozicije = "";
    vrijednost_uloga = "";
    removeAllChildNodes(izlaz);
    trenutni_ispis.textContent = "";
  });
});
