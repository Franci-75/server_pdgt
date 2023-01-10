## TheMovieBot ##

## Progetto Piattaforme Digitali per la Gestione del Territorio ##

## Studente:
 * [Ortolani Francesco matricola n°286732](https://github.com/Franci-75)

------------------------------------------------------------------------

### Obiettivi ###
Il progetto **TheMovieBot**, si pone i seguenti obbiettivi:
1. ottenere informazioni riguardanti un film
2. ottenere i 5 film popolari del momento
3. permette la valutazione di film, previo accesso al servizio di Thmoviedb??????

------------------------------------------------------------------------

### Componenti ###
TheMovieBot è composto da 2 parti:
- La Web API, sviluppata in **NodeJS + Express + Axios**
- Un client, bot di telegram, sviluppato in **NodeJS + Axios + Telegraf + Node-localstorage** per semplificare l'utilizzo da parte dell'utente

------------------------------------------------------------------------

## Descrizione ##

### API ###
L'API effettua richieste HTTP di tipo GET, POST e DELETE, che sfruttando le API di TheMovieDB per adampiere gli obiettivi precedentemente citati.

Per raggiungere l'obiettivo **1** si effettuano 2 richieste HTTP di tipo GET:
-la prima per ottenere L'"id" del film (necessario per la seconda richiesta)
-La seconda per ottenere le effettive informazioni


'https://api.themoviedb.org/3/search/movie?api_key={API_KEY}&language=it-IT&query={film_title}'

https://api.themoviedb.org/3/movie/{id}?api_key={API_KEY}&language=it-IT




 richiedendo solo il titolo del film, si effettua una richiesta per ottenere il MovieID 

Per ottenere le informazioni riguardanti il film è necessario prima ottenere l' "id" del film.
Per ottenere l' "id" del film dato il titolo del film viene effettuata una richiesta 



Per raggiungere l'obiettivo **2** si effettua una semplice richiesta HTTP di tipo GET fornendo come unico parametro obbligatorio l'API_KEY.

'https://api.themoviedb.org/3/discover/movie?api_key={API_KEY}&sort_by=popularity.desc'





Per adempiere l'obiettivo **3** è necessario accedere ad un account di TheMovieDB.

Per raggiungere l'obiettivo 3 vengono effettuati una serie di passaggi:
1- il client richiede al server la creazione di un nuovo token per creare una nuova sessione, passando username e password,
2- il server riceve dal client l'username e la password. Verifica che i dati passati siano corretti( cioè che esista un effettivo account con quel username e password). Se i dati sono:
    -non corretti: allora invio al client una risposta contenente un errore( errore: login fallito)
    -corretti: invio al client una risposta contenente un token alfanumerico(composto da lettere e numeri)
3- se ho ricevuto il token (quindi ho inviato uno username e una password corretta al server) il client invia nuovamente al server il token generato nel punto 2. Se ho ricevuto un token sbagliato mostro un messaggio di errore.
4- Il server riceve il token inviato dal client, lo autentica( verifica se il token sia corretto attraverso delle sue procedure interne). Se il token è corretto allora il server crea una nuova sessione e restituisce al client un id che la identifica univocamente se il token è sbagliato allora il server invia al client un mesaggio di errore (simile a quello del passaggio 2).



### Bot ###

Il bot permette il facile interfacciamento con l'API, fornendo le informazioni direttamente sullo smartphone

Utilizzano le API di telegram


Per la messa online del servizio è stato usato Heroku sia per l'API che per il bot.





## Esempio utilizzo del servizio web ##

Dopo aver ricercato il bot telegram, chiamato "TheMovieBot", al primo avvio, otterremo un messaggio di benvenuto.
<img src='img/start.jpg' ></div>

Comando /info
<img src='img/info.jpg' ></div>

Comando /populars
<img src='img/populars.jpg' ></div>

Comando /login
<img src='img/login.jpg' ></div>

Comando /rating
<img src='img/rating.jpg' ></div>

Comando /logout
<img src='img/logout.jpg' ></div>




### Link ###

Bot telegram: https://t.me/movie_automate_bot

API:          https://server-pdgt.herokuapp.com/

Bot:          https://client-pdgt.herokuapp.com/