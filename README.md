## TheMovieBot ##

## Progetto Piattaforme Digitali per la Gestione del Territorio ##

## Studente:
 * [Ortolani Francesco matricola n°286732](https://github.com/Franci-75)


### Obbiettivi ###
Il progetto **TheMovieBot**, si pone i seguenti obbiettivi:
1. ottenere informazioni riguardanti un film
2. ottenere i 5 film popolari del momento
3. permette la valutazione di film, previo accesso al servizio di Thmoviedb??????



### Componenti ###
TheMovieBot è composto da 2 parti:
- La Web API, sviluppata in **NodeJS + Express + Axios**
- Un client, bot di telegram, sviluppato in **NodeJS + Axios + Telegraf + Node-localstorage** per semplificare l'utilizzo da parte dell'utente

## Descrizione ##

### API ###
L'API effettua richieste HTTP di tipo GET, POST e DELETE, che sfruttano le API di TheMovieDB per adampiere gli obbiettivi precedentemente citati.

Per raggiungere gli obbiettivi 1 si effettua una richiesta di tipo GET, si prelevano le informazioni da TheMovieDB.
In questo caso, per ottenere le informazioni da TheMovieDB si effettua la richiesta HTTP di tipo get, richiedendo solo il titolo del film, si effettua una richiesta per ottenere il MovieID 

Per ottenere le informazioni riguardanti il film è necessario prima ottenere l' "id" del film.
Per ottenere l' "id" del film dato il titolo del film viene effettuata una richiesta 



Per raggiungere l'obiettivo 2 si effettua una richiesta di tipo get fornendo come parametri obbligatori la API KEY e la Query(titolo film).


Per raggiungere l'obiettivo 3


### Bot ###

Il bot prmtte il facile intrfacciamento con l'API, fornendo le informazioni direttamente sullo smartphone

Utilizzano le API di telegram





<img src='img/start.jpg' ></div>

<img src='img/info.jpg' ></div>

<img src='img/login.jpg' ></div>

<img src='img/logout.jpg' ></div>

<img src='img/populars.jpg' ></div>

<img src='img/rating.jpg' ></div>



